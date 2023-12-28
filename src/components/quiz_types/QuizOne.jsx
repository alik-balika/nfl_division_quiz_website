import { useState } from "react";
import { useEffect } from "react";

const QuizOne = () => {
  // eslint-disable-next-line no-unused-vars
  const [divisions, setDivisions] = useState([
    {
      name: "AFC East",
      count: 0,
    },
    {
      name: "AFC North",
      count: 0,
    },
    {
      name: "AFC South",
      count: 0,
    },
    {
      name: "AFC West",
      count: 0,
    },
    {
      name: "NFC East",
      count: 0,
    },
    {
      name: "NFC North",
      count: 0,
    },
    {
      name: "NFC South",
      count: 0,
    },
    {
      name: "NFC West",
      count: 0,
    },
  ]);

  const [currentDivisionIndex, setCurrentDivisionIndex] = useState(0);

  const currentDivision = divisions.length
    ? divisions[currentDivisionIndex].name
    : "";

  const [teams, setTeams] = useState([
    {
      name: "Arizona Cardinals",
      correctTeamPicked: false,
      division: "NFC West",
    },
    {
      name: "Atlanta Falcons",
      correctTeamPicked: false,
      division: "NFC South",
    },
    {
      name: "Baltimore Ravens",
      correctTeamPicked: false,
      division: "AFC North",
    },
    { name: "Buffalo Bills", correctTeamPicked: false, division: "AFC East" },
    {
      name: "Carolina Panthers",
      correctTeamPicked: false,
      division: "NFC South",
    },
    { name: "Chicago Bears", correctTeamPicked: false, division: "NFC North" },
    {
      name: "Cincinnati Bengals",
      correctTeamPicked: false,
      division: "AFC North",
    },
    {
      name: "Cleveland Browns",
      correctTeamPicked: false,
      division: "AFC North",
    },
    { name: "Dallas Cowboys", correctTeamPicked: false, division: "NFC East" },
    { name: "Denver Broncos", correctTeamPicked: false, division: "AFC West" },
    { name: "Detroit Lions", correctTeamPicked: false, division: "NFC North" },
    {
      name: "Green Bay Packers",
      correctTeamPicked: false,
      division: "NFC North",
    },
    { name: "Houston Texans", correctTeamPicked: false, division: "AFC South" },
    {
      name: "Indianapolis Colts",
      correctTeamPicked: false,
      division: "AFC South",
    },
    {
      name: "Jacksonville Jaguars",
      correctTeamPicked: false,
      division: "AFC South",
    },
    {
      name: "Kansas City Chiefs",
      correctTeamPicked: false,
      division: "AFC West",
    },
    {
      name: "Las Vegas Raiders",
      correctTeamPicked: false,
      division: "AFC West",
    },
    {
      name: "Los Angeles Chargers",
      correctTeamPicked: false,
      division: "AFC West",
    },
    {
      name: "Los Angeles Rams",
      correctTeamPicked: false,
      division: "NFC West",
    },
    { name: "Miami Dolphins", correctTeamPicked: false, division: "AFC East" },
    {
      name: "Minnesota Vikings",
      correctTeamPicked: false,
      division: "NFC North",
    },
    {
      name: "New England Patriots",
      correctTeamPicked: false,
      division: "AFC East",
    },
    {
      name: "New Orleans Saints",
      correctTeamPicked: false,
      division: "NFC South",
    },
    { name: "New York Giants", correctTeamPicked: false, division: "NFC East" },
    { name: "New York Jets", correctTeamPicked: false, division: "AFC East" },
    {
      name: "Philadelphia Eagles",
      correctTeamPicked: false,
      division: "NFC East",
    },
    {
      name: "Pittsburgh Steelers",
      correctTeamPicked: false,
      division: "AFC North",
    },
    {
      name: "San Francisco 49ers",
      correctTeamPicked: false,
      division: "NFC West",
    },
    {
      name: "Seattle Seahawks",
      correctTeamPicked: false,
      division: "NFC West",
    },
    {
      name: "Tampa Bay Buccaneers",
      correctTeamPicked: false,
      division: "NFC South",
    },
    {
      name: "Tennessee Titans",
      correctTeamPicked: false,
      division: "AFC South",
    },
    {
      name: "Washington Commanders",
      correctTeamPicked: false,
      division: "NFC East",
    },
  ]);

  const [wrongTeamSelectedIndex, setWrongTeamSelectedIndex] = useState(null);

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(0);

  const [begin, setBegin] = useState(false);

  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScoreForQuiz1") || 0
  );

  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || Infinity
  );

  useEffect(() => {
    randomizeTeams();
  }, []);

  useEffect(() => {
    let interval;
    if (begin) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [begin]);

  useEffect(() => {
    const savedBestScore = localStorage.getItem("bestScoreForQuiz1");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }

    const savedBestTime = localStorage.getItem("bestTime");
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }
  }, [bestTime, bestScore]);

  const handleTeamSelection = (teamIndex) => {
    let updatedScore = score;
    if (teams[teamIndex].division === currentDivision) {
      updatedScore++;
      const updatedTeams = [...teams];
      updatedTeams[teamIndex].correctTeamPicked = true;
      setTeams(updatedTeams);

      divisions[currentDivisionIndex].count++;

      if (divisions[currentDivisionIndex].count == 4) {
        divisions.splice(currentDivisionIndex, 1);
        setCurrentDivisionIndex(Math.floor(Math.random() * divisions.length));
      }
    } else {
      updatedScore--;
      setWrongTeamSelectedIndex(teamIndex);
      setTimeout(() => {
        setWrongTeamSelectedIndex(null);
      }, 400);
    }

    setScore(updatedScore);

    const allTeamsPicked = teams.every((team) => team.correctTeamPicked);
    if (allTeamsPicked) {
      setBegin(false);

      if (updatedScore > bestScore) {
        setBestScore(updatedScore);
        localStorage.setItem("bestScoreForQuiz1", updatedScore);
      }

      if (time < bestTime) {
        setBestTime(time);
        localStorage.setItem("bestTime", time); // Save the best time in localStorage
      }
    }
  };

  const handleNextDivision = () => {
    setCurrentDivisionIndex((prevIndex) => (prevIndex + 1) % divisions.length);
  };

  const handlePreviousDivision = () => {
    setCurrentDivisionIndex(
      (prevIndex) => (prevIndex - 1 + divisions.length) % divisions.length
    );
  };

  const randomizeTeams = () => {
    const randomizedTeams = [...teams];

    let currentIndex = randomizedTeams.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [randomizedTeams[currentIndex], randomizedTeams[randomIndex]] = [
        randomizedTeams[randomIndex],
        randomizedTeams[currentIndex],
      ];
    }

    setTeams(randomizedTeams);
  };

  const startQuiz = () => {
    setScore(0);
    setTime(0);
    teams.filter((team) => (team.correctTeamPicked = false));
    setBegin(true);
    setDivisions([
      {
        name: "AFC East",
        count: 0,
      },
      {
        name: "AFC North",
        count: 0,
      },
      {
        name: "AFC South",
        count: 0,
      },
      {
        name: "AFC West",
        count: 0,
      },
      {
        name: "NFC East",
        count: 0,
      },
      {
        name: "NFC North",
        count: 0,
      },
      {
        name: "NFC South",
        count: 0,
      },
      {
        name: "NFC West",
        count: 0,
      },
    ]);
  };

  const formattedTime = (time) => {
    return `${Math.floor(time / 60)
      .toString()
      .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {/* best score/time information */}
      <div className="flex justify-start my-10 mx-20 text-2xl font-bold border-2 border-black py-2 pl-4 max-w-md">
        <h1 className="mr-5">Best Score: {bestScore}</h1>
        <div className="border-l border-black mx-5"></div>
        <h1>
          Best Time:{" "}
          {bestTime === Infinity ? "Not Recorded" : formattedTime(bestTime)}
        </h1>
      </div>
      {/* information */}
      <div className="flex justify-between my-10 mx-48 text-2xl font-bold">
        <h1>Score: {score}</h1>
        <h1>Time: {formattedTime(time)}</h1>
      </div>
      {/* division picker */}
      {!begin ? (
        <div className="flex justify-center">
          <button
            onClick={startQuiz}
            className="py-2 px-4 rounded transition ease-in-out duration-200 text-white bg-blue-500 hover:bg-blue-400 font-bold border-b-4 border-blue-700 hover:border-blue-500 hover:scale-105"
          >
            Begin
          </button>
        </div>
      ) : (
        <div className="ml-5 flex flex-col items-center">
          <h1 className="text-2xl font-bold">{currentDivision}</h1>
          <div className="flex justify-center mt-4">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-5"
              onClick={handlePreviousDivision}
            >
              &lt;
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={handleNextDivision}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      {/* <div className="ml-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold">{currentDivision}</h1>
        <div className="flex justify-center mt-4">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-5"
            onClick={handlePreviousDivision}
          >
            &lt;
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleNextDivision}
          >
            &gt;
          </button>
        </div>
      </div> */}
      {/* teams */}
      {!begin ? (
        <></>
      ) : (
        <div className="m-10 grid grid-cols-4 gap-4 content-start">
          {teams.map((team, index) => (
            <button
              key={index}
              onClick={() => handleTeamSelection(index)}
              className={`py-2 px-4 rounded transition ease-in-out duration-200 text-white ${
                wrongTeamSelectedIndex === index
                  ? "bg-red-500 border-b-4 border-red-700 animate-shake"
                  : team.correctTeamPicked
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-400 font-bold border-b-4 border-blue-700 hover:border-blue-500 hover:scale-105"
              }`}
              disabled={team.correctTeamPicked}
            >
              {team.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizOne;
