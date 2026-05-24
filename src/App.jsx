import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Mail, 
  Plus, 
  Award, 
  Shield, 
  Check, 
  Search, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  Star, 
  Sliders, 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const INITIAL_SUBMISSIONS = [
  {
    id: "SUB-001",
    title: "NextGen Telstra Ads",
    studentName: "Sydney Ad Minds",
    institution: "University of Sydney",
    description: "A digital-first, AI-driven marketing campaign targeted at Gen Z. The concept focuses on interactive mobile ads that utilize augmented reality to visualize Telstra's 5G speed and connectivity in everyday student scenarios.",
    status: "Shortlisted",
    fileName: "Telstra_GenZ_Pitch.pdf",
    fileSize: "4.8 MB",
    fileType: "pdf",
    submissionDate: "2026-05-18",
    email: "sydneyadminds@uni.edu.au"
  },
  {
    id: "SUB-002",
    title: "Telstra Connect",
    studentName: "Creative Syndicate",
    institution: "RMIT University",
    description: "An experiential campaign featuring 'Connectivity Hubs' in major metropolitan university campuses, supported by a localized micro-influencer content strategy. Promotes community building powered by Telstra.",
    status: "Shortlisted",
    fileName: "RMIT_CreativeSyndicate_Vlog.mp4",
    fileSize: "18.2 MB",
    fileType: "video",
    submissionDate: "2026-05-19",
    email: "creativesyndicate@rmit.edu.au"
  },
  {
    id: "SUB-003",
    title: "Future of Connection",
    studentName: "The Disruptors",
    institution: "UNSW Sydney",
    description: "A high-concept sustainability campaign focusing on how Telstra's smart IoT solutions reduce household carbon footprints. Incorporates interactive gamified features in the My Telstra app to incentivize green actions.",
    status: "Shortlisted",
    fileName: "UNSW_Future_Connection.pdf",
    fileSize: "6.2 MB",
    fileType: "pdf",
    submissionDate: "2026-05-20",
    email: "disruptors@unsw.edu.au"
  },
  {
    id: "SUB-004",
    title: "The Connected Classroom",
    studentName: "Apex Marketing Group",
    institution: "UTS",
    description: "A proposal to partner with local high schools to deploy hybrid virtual-reality classrooms, showing how Telstra's low-latency networks enable seamless collaborative learning across remote regions.",
    status: "Raw/Pending",
    fileName: "UTS_ConnectedClassroom_Pitch.pdf",
    fileSize: "3.5 MB",
    fileType: "pdf",
    submissionDate: "2026-05-22",
    email: "apexmarketing@uts.edu.au"
  },
  {
    id: "SUB-005",
    title: "EcoConnect Telstra",
    studentName: "GreenSpark Consultants",
    institution: "Monash University",
    description: "A comprehensive brand repositioning strategy centered around recycled tech trade-ins, supported by an outdoor ambient advertising campaign using living plant walls that purify air at Telstra retail outlets.",
    status: "Raw/Pending",
    fileName: "Monash_EcoConnect.pdf",
    fileSize: "5.1 MB",
    fileType: "pdf",
    submissionDate: "2026-05-23",
    email: "greenspark@monash.edu"
  },
  {
    id: "SUB-006",
    title: "Telstra Regional Hubs",
    studentName: "Innovate Duo",
    institution: "University of Queensland",
    description: "A hyper-targeted campaign for regional Australia introducing pop-up digital workspace trailers equipped with high-speed satellite connectivity, showcasing Telstra's commitment to bridging the digital divide.",
    status: "Raw/Pending",
    fileName: "UQ_SmartHubs_Video.mp4",
    fileSize: "24.5 MB",
    fileType: "video",
    submissionDate: "2026-05-24",
    email: "innovateduo@uq.edu.au"
  }
];

const INITIAL_JUDGES = [
  { id: 1, name: "Sheba (Chief Judge)", role: "Telstra Chief Brand Officer", email: "sheba.client@telstra.com" },
  { id: 2, name: "Sarah Jenkins", role: "IAA Australia Board Member", email: "sjenkins@iaa.org.au" },
  { id: 3, name: "Marcus Rivera", role: "Multiconnexions Creative Director", email: "marcus.rivera@mcx.com.au" },
  { id: 4, name: "David Chen", role: "Quantana AI Transformation Lead", email: "dchen@quantana.ai" },
  { id: 5, name: "Elena Rostova", role: "Swinburne Senior Lecturer, Marketing", email: "erostova@swin.edu.au" }
];

const INITIAL_EVALUATIONS = [
  // SUB-001 scored by Judge 1, 3, 4
  { judgeId: 1, submissionId: "SUB-001", concept: 23, visuals: 22, strategy: 24, feasibility: 21 },
  { judgeId: 3, submissionId: "SUB-001", concept: 21, visuals: 20, strategy: 23, feasibility: 22 },
  { judgeId: 4, submissionId: "SUB-001", concept: 22, visuals: 24, strategy: 22, feasibility: 20 },
  
  // SUB-002 scored by Judge 1, 2, 5
  { judgeId: 1, submissionId: "SUB-002", concept: 20, visuals: 21, strategy: 20, feasibility: 19 },
  { judgeId: 2, submissionId: "SUB-002", concept: 22, visuals: 23, strategy: 21, feasibility: 22 },
  { judgeId: 5, submissionId: "SUB-002", concept: 19, visuals: 22, strategy: 20, feasibility: 19 },

  // SUB-003 scored by all 5 judges
  { judgeId: 1, submissionId: "SUB-003", concept: 24, visuals: 23, strategy: 25, feasibility: 24 },
  { judgeId: 2, submissionId: "SUB-003", concept: 25, visuals: 24, strategy: 24, feasibility: 23 },
  { judgeId: 3, submissionId: "SUB-003", concept: 23, visuals: 22, strategy: 24, feasibility: 23 },
  { judgeId: 4, submissionId: "SUB-003", concept: 24, visuals: 25, strategy: 23, feasibility: 24 },
  { judgeId: 5, submissionId: "SUB-003", concept: 23, visuals: 24, strategy: 24, feasibility: 22 }
];

function App() {
  // ==========================================
  // APPLICATION STATES
  // ==========================================
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'organizer' | 'judge'
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [judges, setJudges] = useState(INITIAL_JUDGES);
  const [evaluations, setEvaluations] = useState(INITIAL_EVALUATIONS);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ==========================================
  // STUDENT VIEW STATES
  // ==========================================
  const [studentTitle, setStudentTitle] = useState('');
  const [studentTeam, setStudentTeam] = useState('');
  const [studentInstitution, setStudentInstitution] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentDesc, setStudentDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // ==========================================
  // ORGANIZER VIEW STATES
  // ==========================================
  const [organizerSearch, setOrganizerSearch] = useState('');
  const [organizerFilter, setOrganizerFilter] = useState('all'); // 'all' | 'pending' | 'shortlisted'
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Creative Specialist');

  // ==========================================
  // JUDGE VIEW STATES
  // ==========================================
  const [selectedJudgeId, setSelectedJudgeId] = useState(1);
  const [selectedSubId, setSelectedSubId] = useState('');
  const [rubricScores, setRubricScores] = useState({
    concept: 20,
    visuals: 20,
    strategy: 20,
    feasibility: 20
  });
  // Video mock play states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  // PDF mock page state
  const [pdfPage, setPdfPage] = useState(1);

  // Sync selected project scoring inputs when active judge or project changes
  useEffect(() => {
    const shortlistedSubmissions = submissions.filter(s => s.status === 'Shortlisted');
    
    // Set default selected project if not set or if current selection is not shortlisted anymore
    if (shortlistedSubmissions.length > 0) {
      const isCurrentShortlisted = shortlistedSubmissions.some(s => s.id === selectedSubId);
      if (!selectedSubId || !isCurrentShortlisted) {
        setSelectedSubId(shortlistedSubmissions[0].id);
      }
    } else {
      setSelectedSubId('');
    }
  }, [submissions, selectedSubId]);

  useEffect(() => {
    if (selectedSubId && selectedJudgeId) {
      // Find existing evaluation
      const existing = evaluations.find(
        e => e.judgeId === Number(selectedJudgeId) && e.submissionId === selectedSubId
      );
      if (existing) {
        setRubricScores({
          concept: existing.concept,
          visuals: existing.visuals,
          strategy: existing.strategy,
          feasibility: existing.feasibility
        });
      } else {
        // Reset to default
        setRubricScores({ concept: 20, visuals: 20, strategy: 20, feasibility: 20 });
      }
    }
    // Reset media viewer controls
    setIsVideoPlaying(false);
    setVideoProgress(15);
    setPdfPage(1);
  }, [selectedSubId, selectedJudgeId, evaluations]);

  // ==========================================
  // COMPUTED PROPERTIES (SHARED STATES)
  // ==========================================
  const shortlistedIds = submissions.filter(s => s.status === 'Shortlisted').map(s => s.id);

  // Compute average score & reviews count for all submissions
  const getSubmissionMetrics = (subId) => {
    const subEvaluations = evaluations.filter(e => e.submissionId === subId);
    const count = subEvaluations.length;
    if (count === 0) return { average: 0, count: 0 };
    
    const sum = subEvaluations.reduce((acc, curr) => {
      const total = curr.concept + curr.visuals + curr.strategy + curr.feasibility;
      return acc + total;
    }, 0);
    
    return {
      average: Number((sum / count).toFixed(2)),
      count: count
    };
  };

  // Leaderboard data: Shortlisted entries, sorted by average score descending
  const leaderboardData = submissions
    .filter(s => s.status === 'Shortlisted')
    .map(s => {
      const metrics = getSubmissionMetrics(s.id);
      return {
        ...s,
        averageScore: metrics.average,
        reviewsCount: metrics.count
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);

  // Judge tracking: progress of evaluations for each judge
  const judgeProgressData = judges.map(j => {
    // Number of evaluations this judge completed on CURRENT shortlisted submissions
    const completedEvaluations = evaluations.filter(
      e => e.judgeId === j.id && shortlistedIds.includes(e.submissionId)
    );
    return {
      ...j,
      completed: completedEvaluations.length,
      total: shortlistedIds.length
    };
  });

  // Active submission details for review in the judging portal
  const activeSubmissionToReview = submissions.find(s => s.id === selectedSubId);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  
  // Student Portal Submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentTitle || !studentTeam || !studentInstitution || !studentEmail || !studentDesc) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // Add new submission to list
        const newId = `SUB-0${submissions.length + 1}`;
        const newSubmission = {
          id: newId,
          title: studentTitle,
          studentName: studentTeam,
          institution: studentInstitution,
          description: studentDesc,
          status: "Raw/Pending",
          fileName: selectedFile ? selectedFile.name : "Pitch_Presentation.pdf",
          fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "3.2 MB",
          fileType: selectedFile && selectedFile.name.endsWith('.mp4') ? 'video' : 'pdf',
          submissionDate: new Date().toISOString().split('T')[0],
          email: studentEmail
        };

        setSubmissions(prev => [...prev, newSubmission]);
        
        // Reset form
        setStudentTitle('');
        setStudentTeam('');
        setStudentInstitution('');
        setStudentEmail('');
        setStudentDesc('');
        setSelectedFile(null);
        setIsUploading(false);
        setUploadProgress(0);

        showToast("Submission received! An automated acknowledgment email has been sent.", "success");
      }
    }, 200);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      showToast(`Selected file: ${e.target.files[0].name}`, "info");
    }
  };

  // Organizer Dashboard: Add to Shortlist
  const handleAddToShortlist = (subId) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        return { ...s, status: 'Shortlisted' };
      }
      return s;
    }));
    const sub = submissions.find(s => s.id === subId);
    showToast(`"${sub.title}" successfully added to Shortlist!`, "success");
  };

  // Organizer Dashboard: Invite Judge
  const handleInviteJudge = (e) => {
    e.preventDefault();
    if (!inviteEmail) {
      showToast("Please enter a valid email address.", "warning");
      return;
    }
    const newJudgeId = judges.length + 1;
    const newJudge = {
      id: newJudgeId,
      name: `Judge ${newJudgeId} (${inviteEmail.split('@')[0]})`,
      role: inviteRole,
      email: inviteEmail
    };
    setJudges(prev => [...prev, newJudge]);
    setInviteEmail('');
    showToast(`Invitation email sent to ${inviteEmail}!`, "success");
  };

  // Judging Rubric Change handlers
  const handleScoreChange = (criteria, value) => {
    const numericVal = Math.min(25, Math.max(0, Number(value) || 0));
    setRubricScores(prev => ({
      ...prev,
      [criteria]: numericVal
    }));
  };

  // Judging Rubric Submit
  const handleSaveProgress = () => {
    if (!selectedSubId) {
      showToast("No project selected to review.", "warning");
      return;
    }
    showToast("Progress saved locally.", "info");
  };

  const handleSubmitFinalScore = () => {
    if (!selectedSubId) {
      showToast("No project selected to review.", "warning");
      return;
    }

    // Check if evaluation already exists
    const existingIndex = evaluations.findIndex(
      e => e.judgeId === Number(selectedJudgeId) && e.submissionId === selectedSubId
    );

    const evaluationRecord = {
      judgeId: Number(selectedJudgeId),
      submissionId: selectedSubId,
      concept: rubricScores.concept,
      visuals: rubricScores.visuals,
      strategy: rubricScores.strategy,
      feasibility: rubricScores.feasibility
    };

    if (existingIndex > -1) {
      setEvaluations(prev => {
        const updated = [...prev];
        updated[existingIndex] = evaluationRecord;
        return updated;
      });
    } else {
      setEvaluations(prev => [...prev, evaluationRecord]);
    }

    const currentJudge = judges.find(j => j.id === Number(selectedJudgeId));
    const currentSub = submissions.find(s => s.id === selectedSubId);
    showToast(`Score submitted by ${currentJudge.name} for "${currentSub.title}"! Leaderboard updated.`, "success");
  };

  // Total Score Calculation
  const totalRubricScore = rubricScores.concept + rubricScores.visuals + rubricScores.strategy + rubricScores.feasibility;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased text-gray-800">
      {/* ==========================================
          HEADER SYSTEM (Persistent)
          ========================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-xs px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side: MCX and IAA Logos */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
          
          {/* IAA Australia Logo */}
          <div className="flex items-center">
            <img 
              src={`${import.meta.env.BASE_URL}IAA-Australia-Logo-Dark.png`} 
              alt="IAA Australia logo" 
              className="h-10 object-contain filter hover:brightness-105 transition-all"
              onError={(e) => {
                // Fallback to Light version if Dark fails to load
                e.target.src = `${import.meta.env.BASE_URL}IAA-Australia-Logo-Light.png`;
              }}
            />
          </div>
          
          {/* Vertical Divider */}
          <div className="h-6 w-px bg-gray-300"></div>

          {/* MCX Logo */}
          <div className="flex items-center">
            <img 
              src={`${import.meta.env.BASE_URL}multiconnexions_logo.png`} 
              alt="multiconnexions logo" 
              className="h-10 object-contain filter hover:brightness-105 transition-all"
              onError={(e) => {
                // Fallback to text if missing
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center text-gray-800 font-bold tracking-tight text-lg" style={{ display: 'none' }}>
              <span className="text-orange-500">multi</span>connexions
            </div>
          </div>
        </div>

        {/* Right Side: Partnership Tagline with Quantana Logo */}
        <div className="flex items-center space-x-3 bg-gray-100/80 px-4 py-1.5 rounded-full border border-gray-200/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse shrink-0" />
          <span className="text-gray-600 font-semibold text-xs tracking-tight">
            AI Partner
          </span>
          <div className="h-3 w-px bg-gray-300"></div>
          <img 
            src={`${import.meta.env.BASE_URL}Quantana-Logo-Dark.png`} 
            alt="Quantana Logo" 
            className="h-5 object-contain"
            onError={(e) => {
              // Fallback to Light version if Dark fails to load
              e.target.src = `${import.meta.env.BASE_URL}Quantana-Logo-Light.png`;
            }}
          />
        </div>
      </header>

      {/* ==========================================
          NAV BAR SYSTEM (Role-based Switches)
          ========================================== */}
      <div className="bg-white border-b border-gray-200 py-3 px-6 flex justify-center sticky top-[73px] z-45 shadow-sm">
        <nav className="inline-flex bg-gray-100/90 p-1 rounded-full shadow-inner border border-gray-200/60 max-w-full overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('student')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'student'
                ? 'bg-white text-orange-500 shadow-sm border border-gray-200/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Participant Submission Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('organizer')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'organizer'
                ? 'bg-white text-orange-500 shadow-sm border border-gray-200/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Organizer Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('judge')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'judge'
                ? 'bg-white text-orange-500 shadow-sm border border-gray-200/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Expert Judging Portal</span>
          </button>

        </nav>
      </div>

      {/* ==========================================
          TOAST SYSTEM
          ========================================== */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-100 animate-slide-in flex items-center space-x-3 bg-slate-900 text-white px-5 py-4 rounded-xl shadow-xl border border-slate-800 max-w-sm">
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
          <p className="text-xs font-medium text-slate-100">{toast.message}</p>
        </div>
      )}

      {/* ==========================================
          MAIN CONTENT AREA
          ========================================== */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
        
        {/* ==========================================
            VIEW 1: STUDENT VIEW (Participant Portal)
            ========================================== */}
        {activeTab === 'student' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-orange-600 bg-orange-50 border border-orange-200 uppercase">
                  Student Pitch Portal
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  "The Big Idea" Student Marketing Challenge
                </h1>
                <p className="text-base text-gray-600 font-normal leading-relaxed">
                  Pitch your revolutionary ad concepts for the annual challenge based on the active client brief. Stand a chance to present to chief industry executives, receive direct mentorship, and claim the grand title.
                </p>
              </div>

              {/* Brief Summary Box */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Active Challenge Brief</h3>
                    <p className="text-xs text-gray-400">Client Partner: Telstra Australia</p>
                  </div>
                </div>
                
                <div className="space-y-2 border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Core Target:</span>
                    <span className="text-gray-800 font-semibold">Gen Z & Students (16-24)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Key Theme:</span>
                    <span className="text-gray-800 font-semibold">5G Connectivity in Hybrid Futures</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Format:</span>
                    <span className="text-gray-800 font-semibold">Pitch PDF Presentation or Video Pitch</span>
                  </div>
                </div>

                <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-100">
                  <p className="text-[11px] text-gray-500 italic leading-snug">
                    "We are looking for bold, creative advertising strategies that show how high-speed connectivity bridges community gaps in regional and metro campus life."
                  </p>
                </div>
              </div>

              {/* Important reminders */}
              <div className="rounded-xl bg-orange-50/40 p-4 border border-orange-200/50 flex space-x-3">
                <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-orange-950">Auto-Acknowledgment Email</h4>
                  <p className="text-[11px] text-orange-800 leading-normal">
                    After you submit, an automated receipt confirmation and submission copy will be delivered to your team's email.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Submit Your Pitch</h2>
                  <p className="text-xs text-gray-500">Provide your team parameters and upload the final creative file.</p>
                </div>

                <form onSubmit={handleStudentSubmit} className="space-y-5">
                  
                  {/* Grid for Project Title & Team Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="project-title" className="text-xs font-bold text-gray-700">Project Title</label>
                      <input 
                        id="project-title"
                        type="text" 
                        placeholder="e.g. NextGen Telstra Ads"
                        value={studentTitle}
                        onChange={(e) => setStudentTitle(e.target.value)}
                        required
                        className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="team-name" className="text-xs font-bold text-gray-700">Team or Submitter Name</label>
                      <input 
                        id="team-name"
                        type="text" 
                        placeholder="e.g. Creative Syndicate"
                        value={studentTeam}
                        onChange={(e) => setStudentTeam(e.target.value)}
                        required
                        className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="institution" className="text-xs font-bold text-gray-700">Institution / University</label>
                      <input 
                        id="institution"
                        type="text" 
                        placeholder="e.g. RMIT University"
                        value={studentInstitution}
                        onChange={(e) => setStudentInstitution(e.target.value)}
                        required
                        className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-bold text-gray-700">Contact Email</label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="team.lead@university.edu"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                        className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label htmlFor="description" className="text-xs font-bold text-gray-700">Concept Description</label>
                      <span className="text-[10px] text-gray-400">{studentDesc.length}/500 Chars</span>
                    </div>
                    <textarea 
                      id="description"
                      rows="4"
                      maxLength="500"
                      placeholder="Give a brief summary of the campaign idea, target medium, and visual structure..."
                      value={studentDesc}
                      onChange={(e) => setStudentDesc(e.target.value)}
                      required
                      className="w-full text-sm bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Drag-and-drop file upload */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-700 block">Upload Submission Files</span>
                    
                    <div className="relative border-2 border-dashed border-gray-300 hover:border-orange-500 bg-gray-50 hover:bg-orange-50/10 rounded-xl p-6 transition-all group">
                      <input 
                        type="file" 
                        id="file-upload"
                        accept="application/pdf,video/mp4,video/quicktime"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      <div className="flex flex-col items-center justify-center space-y-2 text-center pointer-events-none">
                        <div className="p-3 bg-white rounded-full shadow-xs border border-gray-100 group-hover:scale-105 transition-transform text-orange-500">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-gray-700">Drag & drop your files here or <span className="text-orange-500 underline decoration-2">browse</span></p>
                          <p className="text-[10px] text-gray-400">Accepts PDF or MP4 Videos (Max 50MB)</p>
                        </div>
                      </div>
                    </div>

                    {/* Display selected file details */}
                    {selectedFile && (
                      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3 animate-fade-in">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className="p-2 bg-orange-100 text-orange-600 rounded">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-gray-700 truncate">{selectedFile.name}</p>
                            <p className="text-[10px] text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Upload progress state */}
                  {isUploading && (
                    <div className="space-y-1.5 animate-fade-in">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 font-medium">Uploading pitch concept...</span>
                        <span className="text-gray-800 font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-200" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md shadow-orange-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span>Submit Big Idea Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            VIEW 2: ORGANIZER VIEW (Admin Dashboard)
            ========================================== */}
        {activeTab === 'organizer' && (
          <div className="space-y-8">
            
            {/* Page Title & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-green-700 bg-green-50 border border-green-200 uppercase">
                  Organizer Dashboard
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Competition Triaging Console</h1>
                <p className="text-xs text-gray-500">Overview submissions flow, coordinate the expert panels, and monitor final leaderboards.</p>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center space-x-3 shadow-xs">
                  <div className="p-1.5 bg-orange-50 text-orange-500 rounded-lg">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Submissions</p>
                    <p className="text-lg font-black text-gray-900 leading-tight">{submissions.length}</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center space-x-3 shadow-xs">
                  <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Shortlisted</p>
                    <p className="text-lg font-black text-gray-900 leading-tight">
                      {submissions.filter(s => s.status === 'Shortlisted').length}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center space-x-3 shadow-xs">
                  <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Panel Judges</p>
                    <p className="text-lg font-black text-gray-900 leading-tight">{judges.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Layout: Main Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (2/3 width) - Submissions & Leaderboard */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Panel 1: Submissions List */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                  
                  {/* Table Header Filter controls */}
                  <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">Submissions Queue</h2>
                      <p className="text-xs text-gray-400">Triage incoming student campaign submissions and promote to Shortlist.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search concepts..."
                          value={organizerSearch}
                          onChange={(e) => setOrganizerSearch(e.target.value)}
                          className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-full sm:w-44"
                        />
                      </div>
                      
                      {/* Filter */}
                      <select
                        value={organizerFilter}
                        onChange={(e) => setOrganizerFilter(e.target.value)}
                        className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                      >
                        <option value="all">All Submissions</option>
                        <option value="pending">Pending/Raw</option>
                        <option value="shortlisted">Shortlisted</option>
                      </select>
                    </div>
                  </div>

                  {/* Submissions Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Project ID</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Concept Proposal</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Triage Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {submissions
                          .filter(s => {
                            const matchesSearch = s.title.toLowerCase().includes(organizerSearch.toLowerCase()) || 
                                                 s.studentName.toLowerCase().includes(organizerSearch.toLowerCase()) ||
                                                 s.id.toLowerCase().includes(organizerSearch.toLowerCase());
                            const matchesFilter = organizerFilter === 'all' ||
                                                 (organizerFilter === 'pending' && s.status === 'Raw/Pending') ||
                                                 (organizerFilter === 'shortlisted' && s.status === 'Shortlisted');
                            return matchesSearch && matchesFilter;
                          })
                          .map((sub) => {
                            const isShortlisted = sub.status === 'Shortlisted';
                            return (
                              <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-5 py-4 font-mono font-bold text-gray-500">{sub.id}</td>
                                <td className="px-5 py-4">
                                  <div>
                                    <p className="font-bold text-gray-900 text-sm leading-snug">{sub.title}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">
                                      {sub.studentName} ({sub.institution})
                                    </p>
                                  </div>
                                </td>
                                <td className="px-5 py-4 text-center">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    isShortlisted
                                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                      : 'text-amber-700 bg-amber-50 border-amber-200'
                                  }`}>
                                    {sub.status === 'Raw/Pending' ? 'Raw/Pending' : 'Shortlisted'}
                                  </span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                  {!isShortlisted ? (
                                    <button
                                      onClick={() => handleAddToShortlist(sub.id)}
                                      className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>Add to Shortlist</span>
                                    </button>
                                  ) : (
                                    <span className="inline-flex items-center text-gray-400 font-bold px-3 py-1.5">
                                      <Check className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" />
                                      <span>Shortlisted</span>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        {submissions.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-gray-400">
                              No submissions found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Panel 2: Live Leaderboard */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                  
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900 flex items-center">
                        <TrendingUp className="w-5 h-5 text-orange-500 mr-2 shrink-0" />
                        <span>Judges Leaderboard</span>
                      </h2>
                      <p className="text-xs text-gray-400">Live ranking of shortlisted proposals aggregated by total judge metrics.</p>
                    </div>
                    
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
                      Aggregated Realtime
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Rank</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Project</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Average Score</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Reviews Completed</th>
                          <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Standing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {leaderboardData.map((project, index) => {
                          const rank = index + 1;
                          return (
                            <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-4 text-center font-black">
                                {rank === 1 && (
                                  <span className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full w-6 h-6 border border-amber-200 text-xs">
                                    👑
                                  </span>
                                )}
                                {rank === 2 && (
                                  <span className="inline-flex items-center justify-center bg-slate-100 text-slate-800 rounded-full w-6 h-6 border border-slate-200 text-xs">
                                    2
                                  </span>
                                )}
                                {rank === 3 && (
                                  <span className="inline-flex items-center justify-center bg-orange-100 text-orange-800 rounded-full w-6 h-6 border border-orange-200 text-xs">
                                    3
                                  </span>
                                )}
                                {rank > 3 && (
                                  <span className="text-gray-400">{rank}</span>
                                )}
                              </td>
                              <td className="px-5 py-4">
                                <div>
                                  <p className="font-bold text-gray-900 text-sm leading-snug">{project.title}</p>
                                  <p className="text-[10px] text-gray-400 font-medium">Team: {project.studentName}</p>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-center font-bold text-sm text-gray-900">
                                {project.reviewsCount > 0 ? (
                                  <span className="text-orange-500 font-black">{project.averageScore} <span className="text-[10px] font-normal text-gray-400">/ 100</span></span>
                                ) : (
                                  <span className="text-gray-400 font-normal italic">No scores yet</span>
                                )}
                              </td>
                              <td className="px-5 py-4 text-center text-gray-500 font-bold">
                                {project.reviewsCount} / {judges.length} Judges
                              </td>
                              <td className="px-5 py-4 text-right">
                                {project.reviewsCount === 0 ? (
                                  <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">Awaiting Scoring</span>
                                ) : project.reviewsCount === judges.length ? (
                                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">Finalized</span>
                                ) : (
                                  <span className="text-[10px] text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full font-bold">In Evaluation</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        {leaderboardData.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-8 text-gray-400 italic">
                              Add submissions to the shortlist to initialize the evaluation leaderboard.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>

              {/* Right Column (1/3 width) - Judge Tracking & Invite */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Card 1: Judge Tracking */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-6 space-y-4">
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 flex items-center">
                      <Award className="w-5 h-5 text-orange-500 mr-2 shrink-0" />
                      <span>Judge Tracking Panel</span>
                    </h2>
                    <p className="text-xs text-gray-400">Track current completion rates for active judges on shortlisted entries.</p>
                  </div>

                  <div className="space-y-4">
                    {judgeProgressData.map((j) => {
                      // Calculate percentage
                      const pct = j.total > 0 ? Math.round((j.completed / j.total) * 100) : 0;
                      const isFinished = j.total > 0 && j.completed === j.total;
                      
                      return (
                        <div key={j.id} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <div>
                              <p className="font-bold text-gray-900">{j.name}</p>
                              <p className="text-[10px] text-gray-400">{j.role}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-bold text-gray-800">{j.completed}/{j.total}</span>
                              <span className="text-[10px] text-gray-400 font-medium block">Completed</span>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  isFinished ? 'bg-emerald-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <span className={`text-[10px] font-bold ${isFinished ? 'text-emerald-500' : 'text-gray-500'}`}>
                              {pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card 2: Invite Judge Form */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-6 space-y-4">
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 flex items-center">
                      <Mail className="w-5 h-5 text-orange-500 mr-2 shrink-0" />
                      <span>Invite Panel Judge</span>
                    </h2>
                    <p className="text-xs text-gray-400">Add expert judges to the panel by issuing direct secure invitations.</p>
                  </div>

                  <form onSubmit={handleInviteJudge} className="space-y-4 pt-1">
                    
                    <div className="space-y-1">
                      <label htmlFor="invite-email" className="text-xs font-bold text-gray-700">Judge Email Address</label>
                      <input 
                        id="invite-email"
                        type="email" 
                        placeholder="judge.expert@industry.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                        className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="invite-role" className="text-xs font-bold text-gray-700">Panel Specialty Role</label>
                      <select 
                        id="invite-role"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                      >
                        <option value="Creative Strategy Judge">Creative Strategy Judge</option>
                        <option value="Art & Branding Specialist">Art & Branding Specialist</option>
                        <option value="Commercial Feasibility Analyst">Commercial Feasibility Analyst</option>
                        <option value="Vanguard AI Advisor">Vanguard AI Advisor</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Send Panel Invite
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            VIEW 3: JUDGE VIEW (Expert Judging Portal)
            ========================================== */}
        {activeTab === 'judge' && (
          <div className="space-y-8">
            
            {/* Top Toolbar / Role Selector Context */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase">
                  Judging Portal
                </span>
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Active Evaluation Suite</h1>
                <p className="text-xs text-gray-400">Score shortlisted candidate campaign folders against the standardized challenge rubric.</p>
              </div>

              {/* Selector for Simulation active Judge */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="text-xs font-bold text-gray-500">Reviewing As:</div>
                <select
                  value={selectedJudgeId}
                  onChange={(e) => setSelectedJudgeId(Number(e.target.value))}
                  className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2 font-bold text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                >
                  {judges.map(j => (
                    <option key={j.id} value={j.id}>{j.name} ({j.role.split(' ')[0]})</option>
                  ))}
                </select>

                <select
                  value={selectedSubId}
                  onChange={(e) => setSelectedSubId(e.target.value)}
                  disabled={shortlistedIds.length === 0}
                  className="text-xs bg-orange-500 text-white font-bold rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {shortlistedIds.length === 0 ? (
                    <option>No Shortlisted Projects</option>
                  ) : (
                    submissions.filter(s => s.status === 'Shortlisted').map(s => (
                      <option key={s.id} value={s.id}>{s.id} - {s.title}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Zero Shortlisted State Warning */}
            {shortlistedIds.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
                <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">No Shortlisted Projects Available</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Student submissions must be shortlisted by an organizer before they appear in the judging evaluation console. Switch to the <strong>Organizer Dashboard</strong> to shortlist incoming submissions first.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('organizer')}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <span>Go to Organizer Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              // Active judging layout
              <div className="space-y-8 animate-fade-in">
                
                {/* Review Context Header */}
                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-black text-orange-500 tracking-wider uppercase">Evaluating Concept</span>
                    <h2 className="text-xl font-bold text-gray-900">{activeSubmissionToReview?.title}</h2>
                    <p className="text-xs text-gray-500">Submitted by: <span className="font-semibold text-gray-700">{activeSubmissionToReview?.studentName} ({activeSubmissionToReview?.institution})</span></p>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-400">Folder Status:</span>
                    {evaluations.some(e => e.judgeId === Number(selectedJudgeId) && e.submissionId === selectedSubId) ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                        <Check className="w-3 h-3 mr-1" /> Scored Finalized
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
                        Pending Evaluation
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 1: Media Viewer & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left: Interactive Media Viewer Mock */}
                  <div className="lg:col-span-7 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden flex flex-col h-[400px]">
                    {/* Viewer Header */}
                    <div className="bg-slate-950 px-4 py-2.5 flex justify-between items-center border-b border-slate-800">
                      <div className="flex items-center space-x-2 min-w-0">
                        <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-300 truncate font-mono">
                          {activeSubmissionToReview?.fileName}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium">Size: {activeSubmissionToReview?.fileSize}</span>
                        <button className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Viewer Sandbox Canvas */}
                    <div className="flex-1 bg-slate-900 flex items-center justify-center p-4 relative">
                      
                      {activeSubmissionToReview?.fileType === 'pdf' ? (
                        /* MOCK PDF RENDERER */
                        <div className="w-full max-w-md h-full flex flex-col justify-between bg-white text-gray-900 rounded-lg p-5 border border-slate-700 shadow-xl select-none">
                          <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Telstra Student Proposal</span>
                            </div>
                            <span className="text-[10px] text-orange-500 font-black">IAA 2026</span>
                          </div>

                          <div className="flex-1 py-8 flex flex-col justify-center items-center text-center space-y-4">
                            {pdfPage === 1 && (
                              <>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight uppercase">
                                  {activeSubmissionToReview?.title}
                                </h3>
                                <div className="h-0.5 w-12 bg-orange-500"></div>
                                <p className="text-xs text-slate-600 font-semibold max-w-xs leading-normal">
                                  A holistic student marketing framework built for Telstra's digital experience target indicators.
                                </p>
                              </>
                            )}
                            {pdfPage === 2 && (
                              <>
                                <h4 className="text-sm font-extrabold text-slate-800 uppercase">Target Demographics</h4>
                                <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left pt-2">
                                  <div className="bg-slate-50 p-2 rounded border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase">Gen Z Cohort</p>
                                    <p className="text-xs font-black text-slate-900">Metro Campus</p>
                                  </div>
                                  <div className="bg-slate-50 p-2 rounded border border-gray-100">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase">Tech Segment</p>
                                    <p className="text-xs font-black text-slate-900">AR/5G Focus</p>
                                  </div>
                                </div>
                              </>
                            )}
                            {pdfPage === 3 && (
                              <>
                                <h4 className="text-sm font-extrabold text-slate-800 uppercase">Execution Strategy</h4>
                                <p className="text-[11px] text-slate-600 leading-relaxed text-center">
                                  Our activation relies on deploying outdoor pop-up interactive screens featuring live-generated campus feeds synced via high-speed low-latency 5G.
                                </p>
                              </>
                            )}
                          </div>

                          <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-[10px] text-gray-400">
                            <span>Author: {activeSubmissionToReview?.studentName}</span>
                            <span>Page {pdfPage} of 3</span>
                          </div>
                        </div>
                      ) : (
                        /* MOCK VIDEO PLAYER */
                        <div className="w-full max-w-lg h-full flex flex-col justify-center items-center text-center relative rounded-lg border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
                          {/* Main Frame content */}
                          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-3 relative w-full h-full bg-radial from-slate-900 to-slate-950">
                            {isVideoPlaying ? (
                              <div className="animate-pulse flex flex-col items-center space-y-3">
                                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">Streaming Pitch Media...</span>
                              </div>
                            ) : (
                              <>
                                <div 
                                  onClick={() => setIsVideoPlaying(true)}
                                  className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
                                >
                                  <Play className="w-6 h-6 fill-white ml-1 shrink-0" />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-white">Click Play to Watch Video Pitch</p>
                                  <p className="text-[10px] text-slate-500 font-mono">{activeSubmissionToReview?.fileName}</p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Video controls */}
                          <div className="bg-slate-950 px-4 py-2.5 w-full flex items-center space-x-4 border-t border-slate-800">
                            <button 
                              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                              {isVideoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                            </button>
                            
                            {/* Seek slider */}
                            <div className="flex-1 bg-slate-800 rounded-full h-1 relative overflow-hidden">
                              <div 
                                className="bg-orange-500 h-1 rounded-full" 
                                style={{ width: `${videoProgress}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex items-center space-x-2 shrink-0">
                              <Volume2 className="w-4 h-4 text-slate-400" />
                              <span className="text-[10px] text-slate-400 font-mono">01:42 / 03:00</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Viewer Footer controls (Paging for PDF) */}
                    {activeSubmissionToReview?.fileType === 'pdf' && (
                      <div className="bg-slate-950 px-4 py-2.5 flex justify-between items-center border-t border-slate-800">
                        <button
                          disabled={pdfPage <= 1}
                          onClick={() => setPdfPage(prev => Math.max(1, prev - 1))}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white rounded text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Previous Page
                        </button>
                        <span className="text-slate-400 font-bold font-mono text-xs">Page {pdfPage} / 3</span>
                        <button
                          disabled={pdfPage >= 3}
                          onClick={() => setPdfPage(prev => Math.min(3, prev + 1))}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white rounded text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Next Page
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: Proposal Description and Information details */}
                  <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Concept Summary</h3>
                        <div className="h-px bg-gray-100 my-2"></div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-extrabold text-gray-900 leading-snug">{activeSubmissionToReview?.title}</h4>
                        <p className="text-xs text-gray-500 font-medium">{activeSubmissionToReview?.studentName} | {activeSubmissionToReview?.institution}</p>
                      </div>

                      <div className="text-xs text-gray-600 leading-relaxed font-normal bg-gray-50 p-4 rounded-xl border border-gray-100 max-h-56 overflow-y-auto">
                        {activeSubmissionToReview?.description}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Submitted Date:</span>
                        <span className="text-gray-700 font-semibold">{activeSubmissionToReview?.submissionDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Confirmation Email:</span>
                        <span className="text-gray-700 font-semibold truncate max-w-xs">{activeSubmissionToReview?.email}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Submited Format:</span>
                        <span className="text-gray-700 font-semibold uppercase">{activeSubmissionToReview?.fileType} File</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Section 2: Standardized Scoring Rubric */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  
                  {/* Rubric Header */}
                  <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900 flex items-center">
                        <Sliders className="w-5 h-5 text-orange-500 mr-2 shrink-0" />
                        <span>Standardized Scoring Rubric</span>
                      </h3>
                      <p className="text-xs text-gray-400">Score criteria from 0 to 25. Total sum scales up to 100 points maximum.</p>
                    </div>

                    <div className="flex items-center space-x-3 bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-2xs">
                      <span className="text-xs font-bold text-gray-400">Total Score:</span>
                      <span className="text-xl font-black text-orange-500 font-mono">{totalRubricScore} <span className="text-xs font-normal text-gray-400">/ 100</span></span>
                    </div>
                  </div>

                  {/* Rubric Form inputs */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Criterion 1 */}
                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/80 shadow-3xs space-y-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 pr-4">
                          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">1. Concept & Originality</h4>
                          <p className="text-[11px] text-gray-500 leading-normal">
                            Innovative marketing angles, creativity, and uniqueness of the visual/message conceptualization.
                          </p>
                        </div>
                        <input 
                          type="number" 
                          min="0"
                          max="25"
                          value={rubricScores.concept}
                          onChange={(e) => handleScoreChange('concept', e.target.value)}
                          className="w-12 h-10 text-center font-bold font-mono text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shrink-0"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="range"
                          min="0"
                          max="25"
                          value={rubricScores.concept}
                          onChange={(e) => handleScoreChange('concept', e.target.value)}
                          className="flex-1 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-400 font-bold w-10 shrink-0 text-right">Max: 25</span>
                      </div>
                    </div>

                    {/* Criterion 2 */}
                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/80 shadow-3xs space-y-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 pr-4">
                          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">2. Visuals & Design</h4>
                          <p className="text-[11px] text-gray-500 leading-normal">
                            Art direction, production values, structural layout of PDF pages or video assets, and typography.
                          </p>
                        </div>
                        <input 
                          type="number" 
                          min="0"
                          max="25"
                          value={rubricScores.visuals}
                          onChange={(e) => handleScoreChange('visuals', e.target.value)}
                          className="w-12 h-10 text-center font-bold font-mono text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shrink-0"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="range"
                          min="0"
                          max="25"
                          value={rubricScores.visuals}
                          onChange={(e) => handleScoreChange('visuals', e.target.value)}
                          className="flex-1 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-400 font-bold w-10 shrink-0 text-right">Max: 25</span>
                      </div>
                    </div>

                    {/* Criterion 3 */}
                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/80 shadow-3xs space-y-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 pr-4">
                          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">3. Strategy & Alignment</h4>
                          <p className="text-[11px] text-gray-500 leading-normal">
                            Alignment with the core Telstra student marketing brief parameters and depth of audience research.
                          </p>
                        </div>
                        <input 
                          type="number" 
                          min="0"
                          max="25"
                          value={rubricScores.strategy}
                          onChange={(e) => handleScoreChange('strategy', e.target.value)}
                          className="w-12 h-10 text-center font-bold font-mono text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shrink-0"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="range"
                          min="0"
                          max="25"
                          value={rubricScores.strategy}
                          onChange={(e) => handleScoreChange('strategy', e.target.value)}
                          className="flex-1 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-400 font-bold w-10 shrink-0 text-right">Max: 25</span>
                      </div>
                    </div>

                    {/* Criterion 4 */}
                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-200/80 shadow-3xs space-y-4 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 pr-4">
                          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">4. Feasibility & Impact</h4>
                          <p className="text-[11px] text-gray-500 leading-normal">
                            Viability of roll-out inside Australian college campus environments and projected campaign returns.
                          </p>
                        </div>
                        <input 
                          type="number" 
                          min="0"
                          max="25"
                          value={rubricScores.feasibility}
                          onChange={(e) => handleScoreChange('feasibility', e.target.value)}
                          className="w-12 h-10 text-center font-bold font-mono text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shrink-0"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="range"
                          min="0"
                          max="25"
                          value={rubricScores.feasibility}
                          onChange={(e) => handleScoreChange('feasibility', e.target.value)}
                          className="flex-1 accent-orange-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-400 font-bold w-10 shrink-0 text-right">Max: 25</span>
                      </div>
                    </div>

                  </div>

                  {/* Submission actions */}
                  <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/20">
                    <div className="text-xs text-gray-400 font-medium text-center sm:text-left">
                      Scoring metrics will immediately update the Organizer Dashboard's live Leaderboard ranking.
                    </div>
                    
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        onClick={handleSaveProgress}
                        className="flex-1 sm:flex-initial text-xs font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 hover:border-gray-400 px-5 py-3 rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        Save Progress
                      </button>
                      
                      <button
                        onClick={handleSubmitFinalScore}
                        className="flex-1 sm:flex-initial text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl transition-all shadow-md shadow-orange-500/10 active:scale-95 cursor-pointer"
                      >
                        Submit Final Score
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ==========================================
          FOOTER SYSTEM
          ========================================== */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 px-6 py-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold text-slate-300">"The Big Idea" Student Marketing Challenge</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Jointly hosted by IAA Australia Chapter & multiconnexions. Tech prototype by Quantana.</p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-[10px] text-slate-500">© 2026 IAA Australia. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
