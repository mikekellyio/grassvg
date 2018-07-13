export default class Parabola {
  constructor(a, b, c) {
    this.a = Object.assign({}, a);
    this.b = Object.assign({}, b);
    this.c = Object.assign({}, c);
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }

  getC() {
    return this.c;
  }

  line(numSteps) {
    var l = [];
    for (var currentStep = 0; currentStep <= numSteps; currentStep++) {
      var t = (1 / numSteps) * currentStep;
      l.push(this.point(t));
    }

    return l;
  }

  stepPoints(numSteps) {
    var l = [];
    for (var currentStep = 0; currentStep <= numSteps; currentStep++) {
      var t = (1 / numSteps) * currentStep;
      l.push(this.qPoint(t));
      l.push(this.rPoint(t));
    }

    return l;
  }

  strings(numSteps) {
    var l = [];
    for (var currentStep = 0; currentStep <= numSteps; currentStep++) {
      var t = (1 / numSteps) * currentStep;
      l.push({ q: this.qPoint(t), p: this.point(t), r: this.rPoint(t) });
    }
    return l;
  }

  /**
   * given an arbitrary fraction, t, this returns the touching point, p
   * @param {*} t
   */
  point(t) {
    var a = this.getA(),
      b = this.getB(),
      c = this.getC();

    var x = this.p(a.x, b.x, c.x, t);
    var y = this.p(a.y, b.y, c.y, t);

    return [x, y];
  }

  /**
   * given an arbitrary fraction, t, this returns the point along the line segment bc, r
   * @param {*} t
   */
  rPoint(t) {
    var a = this.getA(),
      b = this.getB(),
      c = this.getC();

    var x = this.r(a.x, b.x, c.x, t);
    var y = this.r(a.y, b.y, c.y, t);

    return [x, y];
  }

  /**
   * given an arbitrary fraction, t, this returns the point along the line segment ab, r
   * @param {*} t
   */
  qPoint(t) {
    var a = this.getA(),
      b = this.getB(),
      c = this.getC();

    var x = this.q(a.x, b.x, c.x, t);
    var y = this.q(a.y, b.y, c.y, t);

    return [x, y];
  }

  q(a, b, c, t) {
    var q = (1 - t) * a + t * b;
    return q;
  }

  r(a, b, c, t) {
    var r = (1 - t) * b + t * c;
    return r;
  }

  p(a, b, c, t) {
    var q = this.q(a, b, c, t);
    var r = this.r(a, b, c, t);

    //combined: (1 - t) * ((1 - t) * a + t * b) + t * ((1 - t) * b + t * c);
    var p = (1 - t) * q + t * r;

    return p;
  }
}
