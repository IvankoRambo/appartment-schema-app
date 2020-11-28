/**
 * Main library for math calculations and object processing
 */

const figureIntersections = require('./figureIntersections');

const checkOutOfWalls = spec => {
    const wallLeft = 0;
    const wallBottom = 0;
    const wallRight = spec.room.w;
    const wallTop = spec.room.l;

    if (spec.rect && Array.isArray(spec.rect)) {
        spec.rect.forEach(element => {
            const elementRightX = element.x0 + element.w;
            const elementTopY = element.y0 + element.l;

            if (element.x0 < wallLeft || element.y0 < wallBottom
                || elementTopY > wallTop || elementRightX > wallRight) {
                    element.outOfWalls = [];
            }

            if (element.x0 < wallLeft) {
                element.outOfWalls.push('left');
            }

            if (element.y0 < wallBottom) {
                element.outOfWalls.push('bottom');
            }

            if (elementTopY > wallTop) {
                element.outOfWalls.push('top');
            }

            if (elementRightX > wallRight) {
                element.outOfWalls.push('right');
            }
        });
    }

    if (spec.triangle &&  Array.isArray(spec.triangle)) {
        spec.triangle.forEach(element => {
            const h = element.l * Math.sqrt(3) / 2;
            const ax = element.x0;
            const ay = element.y0;
            const bx = ax + element.l;
            const cy = ay + h;

            if (ax < wallLeft || ay < wallBottom
                || bx > wallRight || cy > wallTop) {
                element.outOfWalls = [];
            }

            if (ax < wallLeft) {
                element.outOfWalls.push('left');
            }

            if (ay < wallBottom) {
                element.outOfWalls.push('bottom');
            }

            if (bx > wallRight) {
                element.outOfWalls.push('right');
            }

            if (cy > wallTop) {
                element.outOfWalls.push('top');
            }
        });
    }
}

const checkRectangleTriangleCollision = (rectangle, triangle) => {
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

    const intersection1 = figureIntersections.lines(rectAx, rectAy, rectBx, rectBy, triangleBx, triangleBy, triangleCx, triangleCy);
    const intersection2 = figureIntersections.lines(rectDx, rectDy, rectCx, rectCy, triangleAx, triangleAy, triangleCx, triangleCy);
    const intersection3 = figureIntersections.lines(rectBx, rectBy, rectCx, rectCy, triangleAx, triangleAy, triangleCx, triangleCy);
    const intersection4 = figureIntersections.lines(rectBx, rectBy, rectCx, rectCy, triangleBx, triangleBy, triangleCx, triangleCy);
    const intersection5 = figureIntersections.lines(rectAx, rectAy, rectDx, rectDy, triangleAx, triangleAy, triangleCx, triangleCy);
    const intersection6 = figureIntersections.lines(rectAx, rectAy, rectDx, rectDy, triangleBx, triangleBy, triangleCx, triangleCy);
    const triangleInsideOfRect = figureIntersections.triangleInsideOfRect(rectangle, triangle);

    return intersection1 || intersection2 || intersection3 || intersection4 || intersection5 || intersection6 || triangleInsideOfRect;
};


const checkElementCollisions = spec => {
    if (spec && spec.rect && Array.isArray(spec.rect) && spec.triangle && Array.isArray(spec.triangle)) {
        for (let i = 0, len = spec.rect.length; i < len; i += 1) {
            const source = spec.rect[i];
            for (let j = 0, len = spec.triangle.length; j < len; j += 1) {
                const target = spec.triangle[j];
                const collisionResult = checkRectangleTriangleCollision(source, target);

                if (collisionResult) {
                    source.collisionWithElement = true;
                    target.collisionWithElement = true;
                }
            }
        }
    }
};

const calculateFreeSpace = spec => {
    let freeSpace = null;
    let roomSpace = 0;
    let rectSpace = 0;
    let triangleSpace = 0;

    if (spec && spec.room) {
        roomSpace = spec.room.w * spec.room.l;

        if (spec.rect && Array.isArray(spec.rect)) {
            spec.rect.forEach(element => {
                rectSpace += element.w * element.l;
            });
        }

        if (spec.triangle && Array.isArray(spec.triangle)) {
            spec.triangle.forEach(element => {
                triangleSpace += element.l * element.l * Math.sqrt(3) / 4;
            });
        }

        freeSpace = roomSpace - rectSpace - triangleSpace;
    }

    return freeSpace;
};

const checkIntersections = spec => {
    if (spec && spec.room) {
        checkOutOfWalls(spec);
        checkElementCollisions(spec);
    }
};

const detectIfHasErrors = spec => {
    let hasErrors = false;

    if (spec && spec.rect && Array.isArray(spec.rect)) {
        spec.rect.forEach(element => {
            if (!hasErrors) {
                hasErrors = element.outOfWalls || element.collisionWithElement;
            }
        });
    }

    if (!hasErrors && spec && spec.triangle && Array.isArray(spec.triangle)) {
        spec.triangle.forEach(element => {
            if (!hasErrors) {
                hasErrors = element.outOfWalls || element.collisionWithElement;
            }
        });
    }

    return hasErrors;
};

module.exports = {
    calculateFreeSpace,
    checkIntersections,
    detectIfHasErrors
};
