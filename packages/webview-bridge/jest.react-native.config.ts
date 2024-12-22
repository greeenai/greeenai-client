module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  roots: ["<rootDir>/src/react-native"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
