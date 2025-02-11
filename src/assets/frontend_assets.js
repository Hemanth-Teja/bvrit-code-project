const users = [
    {
      user_name: "john_doe",
      password: "$2b$10$abc123xyz",
      no_of_problems_solved: 12,
      problems_solved: [1, 2, 10, 15, 30, 45, 50, 75, 80, 90, 95, 100],
      score: 1200,
    },
    {
      user_name: "alice_wonder",
      password: "$2b$10$def456uvw",
      no_of_problems_solved: 25,
      problems_solved: [1, 5, 8, 11, 15, 20, 25, 28, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 98, 99, 100],
      score: 2500,
    },
    {
      user_name: "mark_smith",
      password: "$2b$10$ghi789rst",
      no_of_problems_solved: 5,
      problems_solved: [5, 10, 20, 30, 50],
      score: 500,
    },
    {
      user_name: "sophia_jones",
      password: "$2b$10$jkl012mno",
      no_of_problems_solved: 8,
      problems_solved: [1, 4, 9, 13, 19, 25, 35, 50],
      score: 800,
    },
    {
      user_name: "david_clark",
      password: "$2b$10$pqr345stu",
      no_of_problems_solved: 20,
      problems_solved: [2, 5, 7, 10, 15, 18, 23, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
      score: 2000,
    },
    {
      user_name: "emily_wilson",
      password: "$2b$10$vwx678yz",
      no_of_problems_solved: 15,
      problems_solved: [1, 3, 6, 8, 12, 18, 20, 25, 30, 40, 45, 50, 55, 60, 70],
      score: 1500,
    },
    {
      user_name: "chris_martin",
      password: "$2b$10$xyz123abc",
      no_of_problems_solved: 10,
      problems_solved: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      score: 1000,
    },
    {
      user_name: "olivia_brown",
      password: "$2b$10$stu456def",
      no_of_problems_solved: 18,
      problems_solved: [1, 4, 8, 12, 18, 23, 29, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      score: 1800,
    },
    {
      user_name: "william_taylor",
      password: "$2b$10$uvw789ghi",
      no_of_problems_solved: 7,
      problems_solved: [10, 15, 20, 30, 40, 50, 60],
      score: 700,
    },
    {
      user_name: "ava_davis",
      password: "$2b$10$jkl012mno",
      no_of_problems_solved: 22,
      problems_solved: [2, 5, 7, 10, 12, 15, 18, 21, 23, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90],
      score: 2200,
    },
    {
      user_name: "ethan_miller",
      password: "$2b$10$pqr345stu",
      no_of_problems_solved: 30,
      problems_solved: Array.from({ length: 30 }, (_, i) => i + 1), // 1-30
      score: 3000,
    },
    {
      user_name: "mia_white",
      password: "$2b$10$vwx678yz",
      no_of_problems_solved: 12,
      problems_solved: [1, 6, 10, 15, 18, 23, 27, 30, 35, 40, 45, 50],
      score: 1200,
    },
    {
      user_name: "logan_hall",
      password: "$2b$10$xyz123abc",
      no_of_problems_solved: 17,
      problems_solved: [2, 8, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
      score: 1700,
    },
    {
      user_name: "harper_adams",
      password: "$2b$10$stu456def",
      no_of_problems_solved: 6,
      problems_solved: [1, 10, 15, 20, 25, 30],
      score: 600,
    },
    {
      user_name: "lucas_moore",
      password: "$2b$10$uvw789ghi",
      no_of_problems_solved: 25,
      problems_solved: Array.from({ length: 25 }, (_, i) => i + 10), // 10-34
      score: 2500,
    },
    {
      user_name: "charlotte_jackson",
      password: "$2b$10$jkl012mno",
      no_of_problems_solved: 14,
      problems_solved: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53],
      score: 1400,
    },
    {
      user_name: "mason_thomas",
      password: "$2b$10$pqr345stu",
      no_of_problems_solved: 19,
      problems_solved: [10, 12, 15, 18, 22, 26, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
      score: 1900,
    },
    {
      user_name: "amelia_robinson",
      password: "$2b$10$vwx678yz",
      no_of_problems_solved: 23,
      problems_solved: Array.from({ length: 23 }, (_, i) => 1 + i * 2), // 1, 3, 5, ..., 45
      score: 2300,
    },
    {
      user_name: "jacob_clark",
      password: "$2b$10$xyz123abc",
      no_of_problems_solved: 10,
      problems_solved: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      score: 1000,
    },
  ];
  
  export default users;
  