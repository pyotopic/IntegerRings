class Point{
    //a point in the ring of integers in Q(sqrt(-d)); handled only using integers when possible (for precision reasons this seems better)
    constructor(a,b,d){
        this.a = a;
        this.b = b;
        this.d = d;
        //this.theta = theta(d);
    }

    get realPart(){
        if (this.d % 4 != 3){
            return this.a;
        }
        else {return this.a + this.b  / 2;}
    }

    get imagPart(){
        if (this.d % 4 != 3){
            return this.b * Math.sqrt(this.d);
        }
        else {return this.b * Math.sqrt(this.d) / 2;}
    }

    print(){
        console.log(this.a + " + " + this.b + "t");
    }

    static add(p1,p2){
        //adds two points
        if (p1.d != p2.d){
            //from different rings, probably shouldn't add them
            return;
        }
        return new Point(p1.a+p2.a,p1.b+p2.b,p1.d);
    }

    static multiply(p1,p2){
        //multiplies two points
        if (p1.d != p2.d){
            //from different rings, probably shouldn't add them
            return;
        }
        let point = new Point(0,0,p1.d);
        point = Point.add(point,p2.scale(p1.a));
        point = Point.add(point,new Point(0,p2.a * p1.b,p1.d));
        point = Point.add(point,baseProduct(p1.d).scale(p1.b * p2.b));

        return point;
    }

    static baseProduct(d){
        //returns theta * theta
        if (d%4 != 3){
            //n^2 - d
            return -1 * d;
        }
        else{
            //n^2 - n + (1+d)/4
            return new Point(-(1+d)/4,1,d);
        }
    }

    scale(c){
        return new Point(c * this.a,c * this.b, this.d);
    }

    norm(){
        if (this.d % 4 == 3){
            return ((this.a + this.b)**2 + this.d * this.b ** 2)/2;
        }
        else{
            return this.a ** 2 + this.d * this.b ** 2;
        }
    }
    
}

function theta(d){
    let i = 2;
    while (i * i < d){
        while (d % (i * i) == 0){
            d /= i * i;
        }
        i += 1;
    }
    this.d = d;
    let t = Math.sqrt(-1 * d);
    if (d % 4 == 3){
        t += 1;
        t /= 2;
    }
    if (d == 2){
        //special case
    }
    return t;
}


class Plane{
    constructor(){
        this.zoom = 1;
        //number of points displayed on one half axis
        this.pointsMin = 5;
        this.pointsMax = 10;
        //this.scale = 0.5 * HEIGHT / this.pointsMin;
    }

    get scale(){
        //number of pixels per unit
        return this.zoom * HEIGHT / (2 * this.pointsMin);
    }

    display(showAxes = true,showLabels = false,showGridlines = false){
        if (showAxes){
            //show axes
            stroke('pink')
            strokeWeight(2);
            line(-WIDTH/2,0,WIDTH/2,0);
            line(0,-HEIGHT/2,0,HEIGHT/2);
            stroke('black')
            
        }
        if (showLabels){
            //show points
        }
        if (showGridlines){
            //show gridlines
        }

        // for (let i in this.points){
        //     this.points[i].display();
        // }
    }
}

class IntegerRing extends Plane{
    constructor(d){
        super();
        //ring of integers for Q(sqrt(-d))
        //first make d square-free
        let i = 2;
        while (i * i < d){
            while (d % (i * i) == 0){
                d /= i * i;
            }
            i += 1;
        }
        this.d = d;
        let theta = Math.sqrt(-1 * d);
        if (d % 4 == 3){
            theta += 1;
            theta /= 2;
        }
        if (d == 2){
            //special case
        }
        this.theta = theta;
        this.points = this.generatePoints();
    }

    generatePoints(){
        //generates enough points to fill screen at current scale
        let xMax = Math.round(HEIGHT/(2 * this.scale));
        let yMax = Math.round(WIDTH/(Math.sqrt(this.d) * this.scale));
        let points = [];
        for(let i = -xMax; i<= xMax; i++){
            for(let j = -yMax; j<=yMax; j++){
                points.push(new Point(i,j,this.d));
            }
        }
        return points;
    }


    showPoints(){
        //console.log("trying!");
        //console.log(this.points.length);
        stroke('white');
        strokeWeight(10);
        for (let i in this.points){
            let p = this.points[i];
            let x = Math.round(p.realPart * this.scale);
            let y = Math.round(p.imagPart * this.scale);
            point(x,y);
            //console.log(x + " is x, and y is " + y);
        }
    }
}