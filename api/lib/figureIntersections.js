/**
 * Helper lib with specific methods for different figures collisions
 */

const figureIntersections = {
    lines: (a, b, c, d, p, q, r, s) => {
        let det;
        let gamma;
        let lambda;
        let intersection;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            intersection = false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            intersection = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }

        return intersection;
    },

    triangleInsideOfRect: (rectangle, triangle) => {
        const triangleAx = triangle.x0;
        const triangleAy = triangle.y0;
        const triangleBx = triangleAx + triangle.l;
        const triangleBy = triangleAy;
        const triangleH = triangle.l * Math.sqrt(3) / 2;
        const triangleCx = triangleAx + triangle.l / 2;
        const triangleCy = triangleAy + triangleH;

        const rectAx = rectangle.x0;
        const rectAy = rectangle.y0;
        const rectBx = rectAx;
        const rectBy = rectAy + rectangle.l;
        const rectCx = rectAx + rectangle.w;
        const rectCy = rectBy;
        const rectDx = rectAx + rectangle.w;
        const rectDy = rectAy;

        return (triangleAx > rectAx) && (triangleAy > rectAy)
            && (triangleBx < rectDx) && (triangleCx < rectCx) && (triangleCx > rectBx)
            && (triangleCy < rectBy)
            && (triangleBy > rectDy);
    }
};

module.exports = figureIntersections;
