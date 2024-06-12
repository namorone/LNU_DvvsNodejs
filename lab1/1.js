// 1. Calculate solutions for a quadratic equation (квадратне рівняння).
// Predict 3 cases - 2, 1, 0 solutions.
// Use throwable error for zero solutions.

// const a = 2, b = 3, c = -5; // expected x1 = -2.5, x2 = 1

function solveQuadratic(a, b, c) {
    const discriminant = b ** 2 - 4 * a * c;
    
    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [x1, x2];
    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return [x];
    } else {
        throw new Error("No real solutions");
    }
}

const a = 2, b = 3, c = -5;
console.log(solveQuadratic(a, b, c)); 