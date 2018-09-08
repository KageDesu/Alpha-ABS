(function () {
    //ABSPathfinding
    //------------------------------------------------------------------------------
    function ABSPathfinding() {
        throw new Error('This is a static class');
    }

    ABSPathfinding.init = function () {
        this.worldWidth = 0;
        this.worldHeight = 0;
        this.worldSize = 0;
        this.char = null;
        this.goalX = 0;
        this.goalY = 0;
    };

    ABSPathfinding.setup = function () {
        this.worldWidth = $gameMap.width();
        this.worldHeight = $gameMap.height();
        this.worldSize = this.worldWidth * this.worldHeight;
    };

    ABSPathfinding.findPath = function (char, goalX, goalY) {
        this.char = char;
        this.goalX = goalX;
        this.goalY = goalY;
        var path = ABSPathfinding.calculatePath();
        if (path.length > 0) {

            if (path.length > 1) {
                var stepX = path[1][0];
                var stepY = path[1][1];

                var deltaX1 = $gameMap.deltaX(stepX, char.x);
                var deltaY1 = $gameMap.deltaY(stepY, char.y);

                if (deltaY1 > 0) {
                    return 2;
                } else if (deltaX1 < 0) {
                    return 4;
                } else if (deltaX1 > 0) {
                    return 6;
                } else if (deltaY1 < 0) {
                    return 8;
                }
            }

        }

        return 0;
    };

    //PRIVATE
    ABSPathfinding.canWalkHere = function (x, y) {
        if (x == this.char.x && y == this.char.y) {
            return true;
        }

        if (!$gameMap.isValid(x, y)) {
            return false;
        }

        if (this.char.isThrough() || this.char.isDebugThrough()) {
            return true;
        }

        if (x == this.goalX && y == this.goalY) {
            return true;
        }

        if (this.char.isCollidedWithCharacters(x, y)) {
            return false;
        }

        if (!this.char.isMapPassable(x, y, 1)) {
            return false;
        }

        return true;
    };

    ABSPathfinding.Node = function (Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent: Parent,
            // array index of this Node in the world linear array
            value: Point.x + (Point.y * this.worldWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the distanceFunction cost to get
            // TO this Node from the START
            f: 0,
            // the distanceFunction cost to get
            // from this Node to the GOAL
            g: 0
        };

        return newNode;
    };

    ABSPathfinding.Neighbours = function (x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && this.canWalkHere(x, N),
            myS = S < this.worldHeight && this.canWalkHere(x, S),
            myE = E < this.worldWidth && this.canWalkHere(E, y),
            myW = W > -1 && this.canWalkHere(W, y),
            result = [];
        if (myN)
            result.push({
                x: x,
                y: N
            });
        if (myE)
            result.push({
                x: E,
                y: y
            });
        if (myS)
            result.push({
                x: x,
                y: S
            });
        if (myW)
            result.push({
                x: W,
                y: y
            });
        this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    };

    ABSPathfinding.findNeighbours = function () {};

    ABSPathfinding.DiagonalNeighbours = function (myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && this.canWalkHere(E, N))
                result.push({
                    x: E,
                    y: N
                });
            if (myW && this.canWalkHere(W, N))
                result.push({
                    x: W,
                    y: N
                });
        }
        if (myS) {
            if (myE && this.canWalkHere(E, S))
                result.push({
                    x: E,
                    y: S
                });
            if (myW && this.canWalkHere(W, S))
                result.push({
                    x: W,
                    y: S
                });
        }
    };

    ABSPathfinding.DiagonalNeighboursFree = function (myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1;
        myS = S < worldHeight;
        myE = E < worldWidth;
        myW = W > -1;
        if (myE) {
            if (myN && this.canWalkHere(E, N))
                result.push({
                    x: E,
                    y: N
                });
            if (myS && this.canWalkHere(E, S))
                result.push({
                    x: E,
                    y: S
                });
        }
        if (myW) {
            if (myN && this.canWalkHere(W, N))
                result.push({
                    x: W,
                    y: N
                });
            if (myS && this.canWalkHere(W, S))
                result.push({
                    x: W,
                    y: S
                });
        }
    };

    ABSPathfinding.ManhattanDistance = function (Point, Goal) {
        // linear movement - no diagonals - just cardinal directions (NSEW)
        return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    };

    ABSPathfinding.calculatePath = function () {
        var distanceFunction = ABSPathfinding.ManhattanDistance;
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = this.Node(null, {
            x: this.char.x,
            y: this.char.y
        });
        var mypathEnd = this.Node(null, {
            x: this.goalX,
            y: this.goalY
        });
        // create an array that will contain all world cells
        var AStar = new Array(this.worldSize);
        // list of currently open Nodes
        var Open = [mypathStart];
        // list of closed Nodes
        var Closed = [];
        // list of the final output array
        var result = [];
        // reference to a Node (that is nearby)
        var myNeighbours;
        // reference to a Node (that we are considering now)
        var myNode;
        // reference to a Node (that starts a path in question)
        var myPath;
        // temp integer variables used in the calculations
        var length, max, min, i, j;
        // iterate through the open list until none are left
        while (length = Open.length) {
            max = this.worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            } else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = this.Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = this.Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until the Open list is empty
        return result;
    };
    AlphaABS.ABSPathfinding = ABSPathfinding;
    AlphaABS.register(ABSPathfinding);
    //END ABSPathfinding
    //------------------------------------------------------------------------------

})();