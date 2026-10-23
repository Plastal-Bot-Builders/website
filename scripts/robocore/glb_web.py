# Web copy of the RoboCore V2 robot for /robocore: stray parts dropped, same-colour materials merged, big parts
# decimated, one mesh, Draco. See src/components/RoboCore/README.md.
#   /Applications/Blender.app/Contents/MacOS/Blender -b --python scripts/robocore/glb_web.py -- \
#       robot_v36.glb public/resources/RoboCore/robocore-v2.glb 220000
import bpy, sys, mathutils
src, dst, target = sys.argv[sys.argv.index('--') + 1:][:3]
target = int(target)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']

# 0. Drop parts that touch nothing (the Fusion model has an 0805 capacitor floating 51 mm above the board).
def box(o):
    pts = [o.matrix_world @ mathutils.Vector(c) for c in o.bound_box]
    return [min(p[i] for p in pts) for i in range(3)], [max(p[i] for p in pts) for i in range(3)]
boxes = {o.name: box(o) for o in meshes}
def gap(a, b):
    return max(max(a[0][i] - b[1][i], b[0][i] - a[1][i], 0) for i in range(3))
stray = [o for o in meshes if min(gap(boxes[o.name], boxes[x.name]) for x in meshes if x is not o) > 0.01]
for o in stray:
    print('STRAY', o.name)
    bpy.data.objects.remove(o, do_unlink=True)
meshes = [o for o in meshes if o not in stray]

def tris(o):
    return sum(len(p.vertices) - 2 for p in o.data.polygons)

# 1. One material per look (base colour, metallic, roughness).
def look(m):
    if not m or not m.use_nodes:
        return ('none',)
    b = next((n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if not b:
        return (m.name,)
    c = b.inputs['Base Color'].default_value
    return (round(c[0], 2), round(c[1], 2), round(c[2], 2), round(b.inputs['Metallic'].default_value, 1), round(b.inputs['Roughness'].default_value, 1))
keep = {}
for o in meshes:
    for s in o.material_slots:
        k = look(s.material)
        keep.setdefault(k, s.material)
        s.material = keep[k]
print('MATERIALS', len(keep))

# 2. Decimate the big parts so the whole robot lands near the target; small parts stay exact.
total = sum(tris(o) for o in meshes)
small = sum(tris(o) for o in meshes if tris(o) < 1500)
ratio = max(0.05, (target - small) / max(1, total - small))
print('TOTAL', total, 'SMALL', small, 'RATIO', round(ratio, 3))
for o in meshes:
    if tris(o) >= 1500:
        bpy.context.view_layer.objects.active = o
        m = o.modifiers.new('dec', 'DECIMATE')
        m.ratio = ratio
        bpy.ops.object.modifier_apply(modifier='dec')

# 3. One object, so the page draws one primitive per material.
bpy.ops.object.select_all(action='DESELECT')
for o in meshes:
    o.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
bpy.ops.object.join()
robot = bpy.context.view_layer.objects.active
robot.name = 'RoboCoreV2'
bpy.ops.object.shade_smooth_by_angle(angle=0.6)
print('FINAL_TRIS', tris(robot))
bpy.ops.export_scene.gltf(filepath=dst, export_format='GLB', use_selection=True, export_apply=True, export_yup=True,
                          export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=7,
                          export_draco_position_quantization=14, export_draco_normal_quantization=10)
