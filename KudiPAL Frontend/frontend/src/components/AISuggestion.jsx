import React, { useState, useEffect, useRef } from 'react';

const AISuggestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [aiSummary, setAiSummary] = useState('Loading AI Summary...');
  const [sideHustle, setSideHustle] = useState('Loading Side Hustle...');
  const [weeklyReport, setWeeklyReport] = useState('Loading Weekly Report...');
  const [loan, setLoan] = useState('Loading Loan info...');
  const [invest, setInvest] = useState('Loading Invest info...');

  const intervalRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // DEMO DATA (only sent to API)
  const USER_ID = 200;
  const SKILLS = 'carpentry';

  const demoTransactions = [
    { date: '2025-12-01', type: 'Income', amount: 5000 },
    { date: '2025-12-03', type: 'Expense', amount: 1200 },
    { date: '2025-12-05', type: 'Income', amount: 7000 },
    { date: '2025-12-06', type: 'Expense', amount: 2500 },
  ];

  const totalIncome = demoTransactions
    .filter(t => t.type === 'Income')
    .reduce((a, b) => a + b.amount, 0);

  const NGROK_HEADERS = {
    'ngrok-skip-browser-warning': 'true',
  };

  /* ---------------- AI SUMMARY (POST) ---------------- */
  useEffect(() => {
    const fetchAISummary = async () => {
      try {
        const response = await fetch(
          `https://preevidently-nondefamatory-rosita.ngrok-free.dev/summary?user_id=${USER_ID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...NGROK_HEADERS,
            },
            body: JSON.stringify({ transactions: demoTransactions }),
          }
        );

        if (!response.ok) throw new Error();
        const text = await response.text();
        setAiSummary(text);
      } catch {
        setAiSummary('Failed to fetch AI Summary.');
      }
    };

    fetchAISummary();
  }, []);

  /* ---------------- SIDE HUSTLE (GET) ---------------- */
  useEffect(() => {
    const fetchSideHustle = async () => {
      try {
        const response = await fetch(
          `https://preevidently-nondefamatory-rosita.ngrok-free.dev/side-hustle?user_id=${USER_ID}&skills=${encodeURIComponent(SKILLS)}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              ...NGROK_HEADERS,
            },
          }
        );

        if (!response.ok) throw new Error();
        const data = await response.json();
        setSideHustle(data.join('\n'));
      } catch {
        setSideHustle('Failed to fetch Side Hustle suggestions.');
      }
    };

    fetchSideHustle();
  }, []);

  /* ---------------- WEEKLY REPORT (POST) ---------------- */
  useEffect(() => {
    const fetchWeeklyReport = async () => {
      try {
        const response = await fetch(
          `https://preevidently-nondefamatory-rosita.ngrok-free.dev/weekly-expense-report?user_id=${USER_ID}&income=${totalIncome}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...NGROK_HEADERS,
            },
            body: JSON.stringify({
              additionalProp1: { garri: '2000' },
            }),
          }
        );

        if (!response.ok) throw new Error();
        const text = await response.text();
        setWeeklyReport(text);
      } catch {
        setWeeklyReport('Failed to fetch Weekly Expense Report.');
      }
    };

    fetchWeeklyReport();
  }, []);

  /* ---------------- LOAN (GET) ---------------- */
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await fetch(
          `https://preevidently-nondefamatory-rosita.ngrok-free.dev/loan?user_id=${USER_ID}`,
          {
            method: 'GET',
            headers: NGROK_HEADERS,
          }
        );

        if (!response.ok) throw new Error();
        const text = await response.text();
        setLoan(text);
      } catch {
        setLoan('Failed to fetch Loan information.');
      }
    };

    fetchLoan();
  }, []);

  /* ---------------- INVEST (GET) ---------------- */
  useEffect(() => {
    const fetchInvest = async () => {
      try {
        const response = await fetch(
          `https://preevidently-nondefamatory-rosita.ngrok-free.dev/invest?user_id=${USER_ID}`,
          {
            method: 'GET',
            headers: NGROK_HEADERS,
          }
        );

        if (!response.ok) throw new Error();
        const text = await response.text();
        setInvest(text);
      } catch {
        setInvest('Failed to fetch Investment suggestions.');
      }
    };

    fetchInvest();
  }, []);

  const suggestions = [
    { title: 'AI Summary', description: aiSummary },
    { title: 'Side Hustle', description: sideHustle },
    { title: 'Weekly Report', description: weeklyReport },
    { title: 'Loan', description: loan },
    { title: 'Invest', description: invest },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      (prev - 1 + suggestions.length) % suggestions.length
    );

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 8000);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(pauseTimeoutRef.current);
    };
  }, [isPaused]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="relative flex items-center">
        <button onClick={prevSlide}>◀</button>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {suggestions.map((item, index) => (
              <div key={index} className="min-w-full p-4 text-center">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {item.description}
                </pre>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextSlide}>▶</button>
      </div>
    </div>
  );
};

export default AISuggestion;
