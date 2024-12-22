module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/react"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
