from manim import *

class PlastalBotAnimation(Scene):
    def construct(self):
        # Robot's head
        head = Circle(radius=1, color=WHITE).set_stroke(width=4)
        eyes = VGroup(
            Dot(point=LEFT * 0.3, color=WHITE),
            Dot(point=RIGHT * 0.3, color=WHITE)
        )
        antenna = Line(UP * 1.5, UP * 2, color=WHITE).set_stroke(width=4)
        head_group = VGroup(head, eyes, antenna)

        # Robot's arms
        left_arm = Line(LEFT * 2 + DOWN * 0.5, LEFT * 0.9 + DOWN * 0.5, color=WHITE).set_stroke(width=4)
        right_arm = Line(RIGHT * 0.9 + DOWN * 0.5, RIGHT * 2 + DOWN * 0.5, color=WHITE).set_stroke(width=4)
        arms = VGroup(left_arm, right_arm)

        # Arrows in circular motion
        arrow1 = Arc(radius=1.2, start_angle=PI/4, angle=PI, color=WHITE).add_tip(width=0.2, length=0.2)
        arrow2 = Arc(radius=1.2, start_angle=-PI/4, angle=PI, color=WHITE).add_tip(width=0.2, length=0.2)
        arrows = VGroup(arrow1, arrow2)

        # Text below
        text = Text("PLASTAL-BOT BUILDERS", font_size=36, color=WHITE)

        # Arrange elements
        head_group.shift(UP * 1.5)
        arms.shift(UP * 1.5)
        arrows.shift(UP * 0.2)
        text.next_to(arrows, DOWN * 2)

        # Add elements to the scene
        self.play(Create(head_group), run_time=2)
        self.play(Create(arms), run_time=1)
        self.play(Write(arrows), run_time=1)

        # Animations
        self.play(Rotate(arrows, angle=2*PI, about_point=ORIGIN), run_time=3)
        self.play(FadeIn(text), run_time=1)

        # Keep the animation on screen
        self.wait(2)
