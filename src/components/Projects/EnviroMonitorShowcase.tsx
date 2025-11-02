import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { asset } from '../../utils/asset';
import Header from '../Header';
import Footer from '../Footer';
import { 
  BeakerIcon, 
  ChartBarIcon, 
  CloudIcon, 
  CpuChipIcon,
  MapPinIcon,
  SignalIcon
} from '@heroicons/react/24/solid';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Specification {
  label: string;
  value: string;
}

export default function EnviroMonitorShowcase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'sensors' | 'data' | 'build'>('overview');

  const features: Feature[] = useMemo(() => [
    {
      id: 'sensors',
      icon: <BeakerIcon className="h-8 w-8" />,
      title: 'Multi-Sensor Array',
      description: 'Monitors air quality (PM2.5, CO2), water quality (pH, TDS, temperature), and ambient conditions in real-time.'
    },
    {
      id: 'mobility',
      icon: <MapPinIcon className="h-8 w-8" />,
      title: 'Mobile Platform',
      description: 'Arduino-powered rover chassis enables sampling across multiple locations with autonomous navigation capabilities.'
    },
    {
      id: 'connectivity',
      icon: <SignalIcon className="h-8 w-8" />,
      title: 'Wireless Data Logging',
      description: 'ESP8266 WiFi module transmits sensor readings to cloud dashboard for real-time monitoring and historical analysis.'
    },
    {
      id: 'analytics',
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: 'Data Visualization',
      description: 'Interactive web dashboard displays trends, generates alerts, and exports data for educational research projects.'
    }
  ], []);

  const specifications: Specification[] = useMemo(() => [
    { label: 'Controller', value: 'Arduino Uno / Mega' },
    { label: 'Air Sensors', value: 'MQ-135 (Air Quality), MH-Z19 (CO2)' },
    { label: 'Water Sensors', value: 'pH Sensor, TDS Sensor, DS18B20 (Temp)' },
    { label: 'Connectivity', value: 'ESP8266 WiFi Module' },
    { label: 'Power', value: '12V LiPo Battery (2200mAh)' },
    { label: 'Motors', value: 'DC Geared Motors with H-Bridge' },
    { label: 'Range', value: '~500m (WiFi dependent)' },
    { label: 'Cost', value: '~$80 USD' }
  ], []);

  const buildSteps = useMemo(() => [
    {
      step: 1,
      title: 'Chassis Assembly',
      description: 'Build the rover base using acrylic or 3D-printed parts. Mount motors and wheels for stable movement.',
      duration: '2 hours'
    },
    {
      step: 2,
      title: 'Electronics Integration',
      description: 'Wire Arduino, motor controller, and sensors. Connect ESP8266 for wireless communication.',
      duration: '3 hours'
    },
    {
      step: 3,
      title: 'Sensor Calibration',
      description: 'Calibrate pH, TDS, and air quality sensors using reference solutions and clean air baselines.',
      duration: '1 hour'
    },
    {
      step: 4,
      title: 'Software Setup',
      description: 'Upload Arduino code, configure WiFi credentials, and set up ThingSpeak or custom dashboard.',
      duration: '2 hours'
    },
    {
      step: 5,
      title: 'Field Testing',
      description: 'Deploy rover in test environment, verify data accuracy, and refine autonomous navigation.',
      duration: '4 hours'
    }
  ], []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <CloudIcon className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Environmental Monitoring</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
              Environmental Monitoring Rover
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A student-built mobile platform for real-time environmental data collection. Monitor air and water quality across multiple locations with wireless data logging.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl max-w-5xl mx-auto"
          >
            <img
              src={asset('/resources/Photos/group.png')}
              alt="Environmental Monitoring Rover"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="text-emerald-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'sensors', label: 'Sensors & Hardware' },
              { id: 'data', label: 'Data Dashboard' },
              { id: 'build', label: 'Build Guide' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  The Environmental Monitoring Rover is a student-designed robotics platform that addresses real-world environmental challenges. 
                  Built with Arduino and common sensors, it provides an accessible introduction to environmental science, robotics, and IoT development.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Students learn sensor integration, data analysis, and mobile robotics while contributing to meaningful environmental monitoring projects. 
                  The rover can be deployed in schools, community centers, or local ecosystems to track pollution levels and water quality.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-emerald-400">8+</div>
                    <div className="text-sm text-gray-400 mt-1">Sensors</div>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-emerald-400">500m</div>
                    <div className="text-sm text-gray-400 mt-1">Range</div>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-emerald-400">$80</div>
                    <div className="text-sm text-gray-400 mt-1">Total Cost</div>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-emerald-400">12hrs</div>
                    <div className="text-sm text-gray-400 mt-1">Build Time</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sensors' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-4">Sensors & Specifications</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  The rover integrates multiple sensor types to provide comprehensive environmental monitoring capabilities. 
                  All components are readily available and suitable for educational budgets.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="font-semibold text-emerald-400">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2 text-yellow-400">⚠️ Calibration Required</h4>
                  <p className="text-sm text-gray-300">
                    All sensors require initial calibration using reference materials. pH sensors need buffer solutions (pH 4.0, 7.0, 10.0), 
                    TDS sensors require calibration solution (1413 μS/cm), and air sensors need clean air baseline readings.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-4">Data Dashboard & Analysis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Sensor data is transmitted via ESP8266 WiFi module to a cloud-based dashboard. We support ThingSpeak, 
                  Blynk, and custom web dashboards built with React and Chart.js.
                </p>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <ChartBarIcon className="h-5 w-5 text-cyan-400" />
                      Real-Time Monitoring
                    </h4>
                    <p className="text-sm text-gray-300">
                      Live graphs update every 10 seconds showing current readings for all sensors. Set custom alert thresholds 
                      for dangerous pollution levels or water contamination.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <CloudIcon className="h-5 w-5 text-purple-400" />
                      Historical Data
                    </h4>
                    <p className="text-sm text-gray-300">
                      Access up to 1 year of historical data. Export CSV files for analysis in Excel, Python, or R. 
                      Compare readings across different locations and time periods.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <CpuChipIcon className="h-5 w-5 text-green-400" />
                      Machine Learning Integration
                    </h4>
                    <p className="text-sm text-gray-300">
                      Advanced students can implement predictive models to forecast air quality trends or detect anomalies 
                      in water quality data using TensorFlow.js.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'build' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-4">Build Guide</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Follow this step-by-step guide to build your own environmental monitoring rover. Estimated total build time: 12 hours.
                </p>

                <div className="space-y-4">
                  {buildSteps.map((step, index) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold">{step.title}</h4>
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{step.duration}</span>
                        </div>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                  <h4 className="text-xl font-bold mb-4">Ready to Start Building?</h4>
                  <p className="text-gray-300 mb-6">
                    Access complete build documentation, Arduino code, wiring diagrams, and 3D files on our GitHub repository.
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors">
                      Download Files
                    </button>
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-emerald-500/50 rounded-lg transition-all">
                      GitHub Repository
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Impact */}
      <section className="py-16 px-6 bg-gradient-to-b from-black/20 to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Educational Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">STEM Learning</h3>
              <p className="text-sm text-gray-300">
                Combines physics, chemistry, electronics, and programming in one hands-on project. Perfect for STEM curriculum integration.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Environmental Awareness</h3>
              <p className="text-sm text-gray-300">
                Students engage with real environmental challenges, developing data-driven solutions and scientific inquiry skills.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Community Service</h3>
              <p className="text-sm text-gray-300">
                Deploy rovers for local environmental monitoring projects, contributing valuable data to community health initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Project</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Want to build your own rover or collaborate on environmental monitoring initiatives? Get in touch with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/programs')}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors"
            >
              Explore Programs
            </button>
            <button
              onClick={() => navigate('/support')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-emerald-500/50 rounded-lg transition-all"
            >
              Support This Project
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all"
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
