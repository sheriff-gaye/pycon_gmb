"use client";
import { useState, useEffect } from "react";
import { getTranslation } from "@/lib/i18n";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Ticket,
  TrendingUp,
  Terminal,
  Code,
  Play,
  TimerReset
} from "lucide-react";
import { HeroProps } from "./interfaces/interface";

interface MatplotlibCommand {
  command: string;
  output: string;
  isCode: boolean;
}

interface JupyterCell {
  code: string;
  output: string;
  displayCode?: string;
  showOutput?: boolean;
  running?: boolean;
}

const Hero = ({ currentLocale }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [matplotlibText, setMatplotlibText] = useState("");
  const [matplotlibLine, setMatplotlibLine] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);
  const [jupyterCells, setJupyterCells] = useState<JupyterCell[]>([]);
  const [currentCell, setCurrentCell] = useState(0);

  const matplotlibCommands: MatplotlibCommand[] = [
    { command: "import matplotlib.pyplot as plt", output: "", isCode: true },
    { command: "import numpy as np", output: "", isCode: true },
    { command: "", output: "", isCode: true },
    { command: "# PyCon Senegambia Stats", output: "", isCode: true },
    {
      command: "categories = ['Speakers', 'Workshops', 'Days']",
      output: "",
      isCode: true
    },
    { command: "values = [25, 15, 2]", output: "", isCode: true },
    {
      command: "colors = ['#F59E0B', '#3B82F6', '#10B981']",
      output: "",
      isCode: true
    },
    { command: "", output: "", isCode: true },
    { command: "plt.figure(figsize=(8, 6))", output: "", isCode: true },
    {
      command: "plt.bar(categories, values, color=colors)",
      output: "",
      isCode: true
    },
    { command: "plt.title('PyCon Senegambia 2025')", output: "", isCode: true },
    { command: "plt.ylabel('Count')", output: "", isCode: true },
    { command: "plt.show()", output: "📊 Rendering chart...", isCode: false }
  ];

  const jupyterQueries: JupyterCell[] = [
    {
      code: "# When is PyCon Senegambia?\ndate = 'Nov 28-29, 2025'",
      output: "PyCon Senegambia: Nov 28-29, 2025"
    },
    {
      code: "# Conference Details\nspeakers = '25+ experts'\nworkshops = '15+ sessions'",
      output: "speakers: 25+ experts\nworkshops: 15+ sessions"
    },
    {
      code: "# Location & Theme\nvenue = 'Senegambia'\ntheme = 'Building Tech Future'",
      output: "Location: Senegambia\nTheme: Building Tech Future"
    }
  ];

  const pythonTech = [
    "Django",
    "Flask",
    "FastAPI",
    "NumPy",
    "Pandas",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Matplotlib",
    "Requests",
    "Beautiful Soup",
    "Selenium",
    "Pytest"
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateDays = () => {
      const eventDate = new Date("2025-11-28T00:00:00");
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fixed matplotlib animation
  useEffect(() => {
    if (matplotlibLine < matplotlibCommands.length) {
      const current = matplotlibCommands[matplotlibLine];

      if (current.command === "" && current.output === "") {
        // Empty line
        setMatplotlibText((prev) => prev + "\n");
        setTimeout(() => setMatplotlibLine((prev) => prev + 1), 100);
      } else {
        let charIndex = 0;
        const typeCommand = () => {
          if (charIndex < current.command.length) {
            setMatplotlibText((prev) => prev + current.command[charIndex]);
            charIndex++;
            setTimeout(typeCommand, 30);
          } else {
            // Add output after command
            setTimeout(() => {
              let newText = matplotlibText + current.command;
              if (current.output) {
                newText += "\n" + current.output;

                // Start chart animation when we reach plt.show()
                if (matplotlibLine === matplotlibCommands.length - 1) {
                  setChartProgress(1);
                  setTimeout(() => {
                    let progress = 1;
                    const chartInterval = setInterval(() => {
                      progress += 5;
                      setChartProgress(progress);
                      if (progress >= 100) {
                        clearInterval(chartInterval);
                      }
                    }, 50);
                  }, 500);
                }
              }
              newText += "\n";
              setMatplotlibText(newText);
              setTimeout(() => setMatplotlibLine((prev) => prev + 1), 300);
            }, 200);
          }
        };

        typeCommand();
      }
    } else {
      setTimeout(() => {
        setMatplotlibText("");
        setMatplotlibLine(0);
        setChartProgress(0);
      }, 4000);
    }
  }, [matplotlibLine]);

  // Jupyter notebook animation
  useEffect(() => {
    if (currentCell < jupyterQueries.length) {
      const cell = jupyterQueries[currentCell];
      let codeIndex = 0;
      let currentCode = "";

      const typeCode = () => {
        if (codeIndex < cell.code.length) {
          currentCode += cell.code[codeIndex];
          setJupyterCells((prev) => {
            const newCells = [...prev];
            newCells[currentCell] = {
              ...cell,
              displayCode: currentCode,
              showOutput: false
            };
            return newCells;
          });
          codeIndex++;
          setTimeout(typeCode, 20);
        } else {
          setTimeout(() => {
            setJupyterCells((prev) => {
              const newCells = [...prev];
              newCells[currentCell] = {
                ...cell,
                displayCode: currentCode,
                showOutput: true,
                running: true
              };
              return newCells;
            });

            setTimeout(() => {
              setJupyterCells((prev) => {
                const newCells = [...prev];
                newCells[currentCell] = {
                  ...cell,
                  displayCode: currentCode,
                  showOutput: true,
                  running: false
                };
                return newCells;
              });

              setTimeout(() => setCurrentCell((prev) => prev + 1), 1500);
            }, 500);
          }, 300);
        }
      };

      typeCode();
    } else {
      setTimeout(() => {
        setJupyterCells([]);
        setCurrentCell(0);
      }, 3000);
    }
  }, [currentCell]);

  const stats = [
    {
      value: "2",
      label: getTranslation(currentLocale, "hero.stats.countries"),
      color: "text-yellow-400"
    },
    {
      value: "25+",
      label: getTranslation(currentLocale, "hero.stats.speakers"),
      color: "text-blue-400"
    },
    {
      value: "500+",
      label: getTranslation(currentLocale, "hero.stats.developers"),
      color: "text-green-400"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with Python image from Unsplash */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("/images/heo.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-yellow-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/50 to-transparent"></div>
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-yellow-400/20 to-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-56 h-56 bg-linear-to-r from-blue-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-linear-to-r from-green-400/15 to-green-500/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-linear-to-r from-purple-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating Python Libraries */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pythonTech.map((tech, index) => {
          const positions = [
            { top: "15%", left: "10%", delay: "0s" },
            { top: "25%", left: "85%", delay: "2s" },
            { top: "35%", left: "5%", delay: "4s" },
            { top: "45%", left: "90%", delay: "1s" },
            { top: "55%", left: "8%", delay: "3s" },
            { top: "65%", left: "88%", delay: "5s" },
            { top: "75%", left: "12%", delay: "2.5s" },
            { top: "20%", left: "75%", delay: "1.5s" },
            { top: "40%", left: "15%", delay: "3.5s" },
            { top: "60%", left: "80%", delay: "4.5s" },
            { top: "70%", left: "20%", delay: "0.5s" },
            { top: "30%", left: "70%", delay: "5.5s" },
            { top: "50%", left: "25%", delay: "2.8s" }
          ];
          const pos = positions[index];
          return (
            <div
              key={tech}
              className="absolute animate-bounce"
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: pos.delay,
                animationDuration: "3s"
              }}
            >
              <div className="bg-linear-to-r from-yellow-400/10 to-blue-400/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-yellow-400/20 shadow-lg">
                <span className="text-yellow-400 font-mono text-xs font-semibold">
                  {tech}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Event badge */}
          <div
            className={`inline-flex items-center px-8 py-4 rounded-full bg-linear-to-r from-yellow-500/20 to-blue-500/20 backdrop-blur-md border border-yellow-400/40 mb-8 shadow-2xl transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="text-sm font-medium text-yellow-100 tracking-wide">
              Join Senegambia's Premier Python Conference
            </span>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span
              className={`block lg:inline bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              PyCon
            </span>
            <span
              className={`block lg:inline lg:ml-4 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Senegambia
            </span>
            <span
              className={`block lg:inline lg:ml-4 text-white text-4xl md:text-6xl lg:text-7xl transform transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              2025
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mb-12 transform transition-all duration-1000 delay-800 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
              {getTranslation(currentLocale, "hero.subtitle.building")}{" "}
              <span className="font-semibold text-yellow-400">
                {getTranslation(currentLocale, "hero.subtitle.gambia")}
              </span>{" "}
              {getTranslation(currentLocale, "hero.subtitle.and")}{" "}
              <span className="font-semibold text-blue-400">
                {getTranslation(currentLocale, "hero.subtitle.senegal")}
              </span>
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              {getTranslation(currentLocale, "hero.subtitle.empowering")}
            </p>
          </div>

          {/* MATPLOTLIB + COUNTDOWN + JUPYTER - Three Column Layout */}
          <div
            className={`mb-12 transform transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
              {/* Left - Matplotlib with Chart Visualization */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 via-yellow-500/50 to-red-500/50 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl overflow-hidden border border-orange-500/30 shadow-2xl">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 flex items-center gap-2 border-b border-orange-500/20">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Terminal className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 text-sm font-mono">
                        pyconsenegambia.py
                      </span>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-left overflow-hidden">
                    <div className="text-orange-400 text-xs leading-relaxed whitespace-pre-wrap h-48 overflow-auto font-mono">
                      {matplotlibText}
                      <span className="inline-block w-2 h-3 bg-orange-400 ml-1 animate-pulse"></span>
                    </div>
                    {/* Chart Visualization */}
                    {/* Chart Visualization - FIXED VERSION */}
                    {chartProgress > 0 && (
                      <div className="mt-4 bg-white/5 rounded p-3 border border-orange-500/20">
                        <div className="flex items-end justify-center h-32 gap-4 px-4">
                          {/* Speakers Bar */}
                          <div className="flex flex-col items-center flex-1 max-w-20">
                            <div className="h-24 flex flex-col justify-end w-full">
                              <div
                                className="w-full rounded-t-lg bg-yellow-500 transition-all duration-300 ease-out"
                                style={{
                                  height: `${(chartProgress * 24) / 100}px` // 24px is the max height
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 mt-2 font-medium">
                              Speakers
                            </span>
                            <span className="text-xs text-yellow-400 font-bold">
                              25
                            </span>
                          </div>

                          {/* Workshops Bar */}
                          <div className="flex flex-col items-center flex-1 max-w-20">
                            <div className="h-24 flex flex-col justify-end w-full">
                              <div
                                className="w-full rounded-t-lg bg-blue-500 transition-all duration-300 ease-out"
                                style={{
                                  height: `${(chartProgress * 14.4) / 100}px` // 60% of 24px
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 mt-2 font-medium">
                              Workshops
                            </span>
                            <span className="text-xs text-blue-400 font-bold">
                              15
                            </span>
                          </div>

                          {/* Days Bar */}
                          <div className="flex flex-col items-center flex-1 max-w-20">
                            <div className="h-24 flex flex-col justify-end w-full">
                              <div
                                className="w-full rounded-t-lg bg-green-500 transition-all duration-300 ease-out"
                                style={{
                                  height: `${(chartProgress * 1.92) / 100}px` // 8% of 24px
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-300 mt-2 font-medium">
                              Days
                            </span>
                            <span className="text-xs text-green-400 font-bold">
                              2
                            </span>
                          </div>
                        </div>

                        {/* Chart title */}
                        <div className="text-center mt-3">
                          <span className="text-sm text-gray-300 font-semibold">
                            PyCon Senegambia 2025 Stats
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-slate-900 to-slate-950 px-4 py-2 border-t border-orange-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Code className="w-3 h-3" />
                      <span>Matplotlib 3.8</span>
                    </div>
                    <div className="text-xs text-orange-400">Data Viz</div>
                  </div>
                </div>
              </div>

              {/* Center - COUNTDOWN TIMER */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 via-orange-500/40 to-red-500/40 rounded-3xl blur-2xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-xl rounded-3xl px-8 py-8 border-2 border-yellow-400/40 shadow-2xl h-full flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <TimerReset className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 font-bold text-lg uppercase tracking-widest">
                      Countdown
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-3 mb-4">
                    <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent tabular-nums leading-none">
                      {daysLeft}
                    </div>
                    <div className="text-2xl font-bold text-gray-300 uppercase tracking-wider">
                      Days
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-widest">
                    Until PyCon Senegambia
                  </div>
                </div>
              </div>

              {/* Right - Jupyter Notebook Style */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 flex items-center gap-2 border-b border-blue-500/20">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Py</span>
                      </div>
                      <span className="text-blue-400 text-sm font-semibold">
                        Jupyter Notebook
                      </span>
                    </div>
                  </div>
                  <div
                    className="p-4 overflow-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {jupyterCells.map((cell, index) => (
                      <div key={index} className="mb-4">
                        {/* Code Cell */}
                        <div className="flex gap-2">
                          <div className="text-blue-400 text-xs pt-1">
                            In [{index + 1}]:
                          </div>
                          <div className="flex-1 bg-slate-800/50 rounded border border-blue-500/20 p-2">
                            <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                              {cell.displayCode}
                            </pre>
                          </div>
                        </div>
                        {/* Output Cell */}
                        {cell.showOutput && (
                          <div className="flex gap-2 mt-2">
                            <div className="text-red-400 text-xs pt-1">
                              {cell.running ? (
                                <Play className="w-3 h-3 animate-pulse" />
                              ) : (
                                `Out[${index + 1}]:`
                              )}
                            </div>
                            <div className="flex-1 bg-slate-900/50 rounded border border-purple-500/20 p-2">
                              <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">
                                {cell.output}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {jupyterCells.length === 0 && (
                      <div className="text-gray-500 text-sm italic text-center py-8">
                        Loading notebook...
                      </div>
                    )}
                  </div>
                  <div className="bg-linear-to-r from-slate-900 to-slate-950 px-4 py-2 border-t border-blue-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Code className="w-3 h-3" />
                      <span>Python 3.12</span>
                    </div>
                    <div className="text-xs text-blue-400">Interactive</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event details */}
          <div
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 mb-16 transform transition-all duration-1000 delay-1100 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Calendar className="w-6 h-6 text-yellow-400 mr-3 group-hover:rotate-12 transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  November 28-29, 2025
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, "hero.event.mark")}
                </div>
              </div>
            </div>
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <MapPin className="w-6 h-6 text-blue-400 mr-3 group-hover:bounce transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  {getTranslation(currentLocale, "hero.event.location")}
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, "hero.event.vision")}
                </div>
              </div>
            </div>
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Users className="w-6 h-6 text-green-400 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  {getTranslation(currentLocale, "hero.event.attendees")}
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, "hero.event.community")}
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transform transition-all duration-1000 delay-1300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <button
              onClick={() => window.open("#pricing", "_self")}
              className="group relative overflow-hidden bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white px-14 py-7 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                <Ticket className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform" />
                Get Your Tickets Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
            </button>
            <button
              onClick={() => window.open("#schedule", "_self")}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md text-white px-14 py-7 rounded-full text-xl font-bold border-2 border-purple-400/50 hover:shadow-2xl transition-all duration-300 hover:bg-white/20 hover:border-purple-300 hover:scale-105"
            >
              <span className="flex items-center">
                <Star className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                View Schedule
                <TrendingUp className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`transform transition-all duration-1000 delay-1500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center group cursor-pointer transition-all duration-500 transform hover:scale-110 ${
                    currentStat === index
                      ? "scale-110 opacity-100"
                      : "opacity-75"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`text-5xl md:text-6xl font-bold ${stat.color} mb-3 transition-all duration-300`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-widest font-medium">
                      {stat.label}
                    </div>
                    {currentStat === index && (
                      <div className="absolute -inset-4 bg-linear-to-r from-transparent via-white/10 to-transparent rounded-lg animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
