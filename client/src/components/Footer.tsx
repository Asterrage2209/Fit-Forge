const Footer = () => {
    return (
        <footer className="bg-[var(--ui-background)] border-t border-slate-200 dark:border-slate-700 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} FitForge. All Rights Reserved. Built from a Java OOP Project.</p>
            </div>
        </footer>
    );
};

export default Footer;
