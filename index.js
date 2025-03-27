const express = require("express");
const winston = require("winston");

const app = express();
const PORT = 3000;

// Winston Logger Setup
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculator-microservice" },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

// Middleware to parse JSON
app.use(express.json());

// Calculator API Endpoints
const calculate = (req, res, operation) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        logger.error("Invalid input: num1 and num2 must be numbers");
        return res.status(400).json({ error: "Invalid input. num1 and num2 must be numbers" });
    }

    let result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) {
                logger.error("Division by zero error");
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            result = num1 / num2;
            break;
    }

    logger.info(`New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`);
    res.json({ operation, num1, num2, result });
};

app.post("/add", (req, res) => calculate(req, res, "add"));
app.post("/subtract", (req, res) => calculate(req, res, "subtract"));
app.post("/multiply", (req, res) => calculate(req, res, "multiply"));
app.post("/divide", (req, res) => calculate(req, res, "divide"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    logger.info(`Server started on port ${PORT}`);
});