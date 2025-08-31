const TermsPage = () => (
    <div className="max-w-3xl mx-auto animate-fade-in bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 border-b border-slate-300 dark:border-slate-700 pb-4">Terms & Conditions</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-300 prose dark:prose-invert">
        <p>Welcome to FitForge. These terms and conditions outline the rules and regulations for the use of FitForge's Website.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use FitForge if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2 className="text-xl font-semibold pt-4">1. License</h2>
        <p>Unless otherwise stated, FitForge and/or its licensors own the intellectual property rights for all material on FitForge. All intellectual property rights are reserved. You may access this from FitForge for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <h2 className="text-xl font-semibold pt-4">2. User Data and Privacy</h2>
        <p>This application is for demonstration purposes only. Any data you enter is stored in-memory on the server and will be cleared when the server restarts. We do not persist or share your data.</p>
        <h2 className="text-xl font-semibold pt-4">3. Disclaimer</h2>
        <p>The information provided by FitForge is for general informational purposes only. Always consult with a qualified healthcare professional before beginning any fitness program.</p>
      </div>
    </div>
  );
  
  export default TermsPage;