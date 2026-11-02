import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Download, 
  FileText, 
  AlertCircle, 
  MapPin, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ScheduleItem, ResultItem } from '../types';

interface StudentAcademicsViewProps {
  studentName: string;
  studentId: string;
  department: string;
  gpa: number;
  attendancePct: number;
  creditsEarned: number;
  totalCredits: number;
  schedule: ScheduleItem[];
  results: ResultItem[];
  onOpenTranscriptModal: () => void;
  onOpenTimetableModal: () => void;
  onOpenLeaveRequestModal: () => void;
}

export const StudentAcademicsView: React.FC<StudentAcademicsViewProps> = ({
  studentName,
  studentId,
  department,
  gpa,
  attendancePct,
  creditsEarned,
  totalCredits,
  schedule,
  results,
  onOpenTranscriptModal,
  onOpenTimetableModal,
  onOpenLeaveRequestModal,
}) => {
  // Course attendance & syllabus tracking
  const coursesData = [
    {
      code: 'CS-201',
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Meenakshi Sundaram',
      credits: 4,
      room: 'LH-101 • CS Block',
      schedule: 'Mon, Wed, Fri 09:00 AM',
      attendance: 94,
      totalClasses: 34,
      attendedClasses: 32,
      syllabusPct: 78,
      status: 'On Track'
    },
    {
      code: 'CS-204',
      title: 'Database Management Systems',
      instructor: 'Prof. Rajesh Khanna',
      credits: 4,
      room: 'Lab 3 • Tech Annex',
      schedule: 'Tue, Thu 11:30 AM',
      attendance: 89,
      totalClasses: 28,
      attendedClasses: 25,
      syllabusPct: 65,
      status: 'On Track'
    },
    {
      code: 'CS-208',
      title: 'Computer Networks',
      instructor: 'Dr. Alok Verma',
      credits: 3,
      room: 'Room 204 • Main Building',
      schedule: 'Mon, Wed 02:00 PM',
      attendance: 84,
      totalClasses: 25,
      attendedClasses: 21,
      syllabusPct: 70,
      status: 'Satisfactory'
    },
    {
      code: 'CS-210',
      title: 'Operating Systems & Systems Lab',
      instructor: 'Prof. Sneha Deshmukh',
      credits: 3,
      room: 'OS Laboratory 2',
      schedule: 'Fri 03:30 PM',
      attendance: 92,
      totalClasses: 13,
      attendedClasses: 12,
      syllabusPct: 80,
      status: 'On Track'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-md">
              Semester IV
            </span>
            <span className="text-xs font-mono text-slate-500">ID: {studentId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Courses & Academic Progress
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {department} • Personal academic records, enrolled subjects, and evaluation results.
          </p>
        </div>

        {/* Quick Document Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenTimetableModal}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Weekly Timetable</span>
          </button>
          <button
            onClick={onOpenTranscriptModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Official Transcript</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Cumulative GPA</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{gpa.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 4.0</span></div>
            <div className="text-[11px] font-bold text-emerald-600 mt-0.5">Top 5% of class</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Overall Attendance</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{attendancePct}%</div>
            <div className="text-[11px] font-bold text-purple-600 mt-0.5">Threshold: 75% min</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Degree Credits</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{creditsEarned} <span className="text-xs font-normal text-slate-400">/ {totalCredits}</span></div>
            <div className="text-[11px] font-bold text-slate-500 mt-0.5">53% Completed</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Active Courses</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{coursesData.length} Subjects</div>
            <div className="text-[11px] font-bold text-amber-600 mt-0.5">14 Credit Hours</div>
          </div>
        </div>
      </div>

      {/* Registered Courses Table */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Currently Enrolled Subjects
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject modules registered for Spring/Fall Semester IV.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-lg">
            Academic Year: 2026-2027
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {coursesData.map((course) => (
            <div key={course.code} className="p-6 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-500">• {course.credits} Credits</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      course.attendance >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{course.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {course.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {course.room}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-blue-600">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> {course.schedule}
                    </span>
                  </div>
                </div>

                {/* Course Attendance & Syllabus Progress */}
                <div className="flex items-center gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right min-w-[100px]">
                    <div className="text-xs text-slate-400 font-medium">Subject Attendance</div>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">
                      {course.attendance}%
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {course.attendedClasses} / {course.totalClasses} lectures
                    </div>
                  </div>

                  <div className="w-28 hidden sm:block">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Syllabus</span>
                      <span className="font-bold text-slate-700">{course.syllabusPct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${course.syllabusPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Semester Results & Student Academic Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Semester Results (2 cols) */}
        <section className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" /> Semester Examination Results
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official grades recorded by the Department Board of Examiners.
              </p>
            </div>
            <button
              onClick={onOpenTranscriptModal}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Full Transcript
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Course Module</th>
                  <th className="p-4">Credits</th>
                  <th className="p-4">Score</th>
                  <th className="p-4 text-right pr-6">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-slate-900">{res.course}</div>
                      <div className="text-xs font-mono text-slate-400">{res.code} • {res.semester}</div>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{res.credits}</td>
                    <td className="p-4 font-mono text-slate-600">{res.scorePct}%</td>
                    <td className="p-4 text-right pr-6">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono font-bold text-xs ${
                        res.grade.startsWith('A') 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {res.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Academic Rules & Leave Helper */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" /> Academic Standing Policy
            </h3>
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600 leading-relaxed">
              <div className="font-bold text-slate-800">Minimum Requirements:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>75% mandatory attendance in each subject to sit for semester finals.</li>
                <li>Cumulative GPA must remain above 2.0 to remain in good standing.</li>
                <li>Total 120 credit units required for Bachelor of Science degree conferral.</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs text-purple-900">
              <div className="font-bold mb-1">Missing classes due to illness or event?</div>
              <p className="text-purple-700">Submit an official leave request to notify your course coordinators.</p>
            </div>
          </div>

          <button
            onClick={onOpenLeaveRequestModal}
            className="mt-6 w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-purple-600/20 active:scale-95 text-center"
          >
            Apply for Academic Leave
          </button>
        </section>
      </div>
    </div>
  );
};
