import { Path, Curve, Segment, Numerical } from 'paper'

// 消しゴムのツール
export function offsetUtils() {
  return {
    offsetPath(path, offset, result) {
      const outerPath = new Path({ insert: false })
      const epsilon = Numerical.GEOMETRIC_EPSILON
      const enforeArcs = true
      for (let i = 0; i < path.curves.length; i++) {
        const curve = path.curves[i]
        if (curve.hasLength(epsilon)) {
          const segments = this.getOffsetSegments(curve, offset)
          const start = segments[0]
          if (outerPath.isEmpty()) {
            outerPath.addSegments(segments)
          } else {
            const lastCurve = outerPath.lastCurve
            if (!lastCurve.point2.isClose(start.point, epsilon)) {
              if (
                enforeArcs ||
                lastCurve
                  .getTangentAtTime(1)
                  .dot(start.point.subtract(curve.point1)) >= 0
              ) {
                this.addRoundJoin(
                  outerPath,
                  start.point,
                  curve.point1,
                  Math.abs(offset)
                )
              } else {
                outerPath.lineTo(start.point)
              }
            }
            outerPath.lastSegment.handleOut = start.handleOut
            outerPath.addSegments(segments.slice(1))
          }
        }
      }
      if (path.isClosed()) {
        if (
          !outerPath.lastSegment.point.isClose(
            outerPath.firstSegment.point,
            epsilon
          ) &&
          (enforeArcs ||
            outerPath.lastCurve
              .getTangentAtTime(1)
              .dot(
                outerPath.firstSegment.point.subtract(path.firstSegment.point)
              ) >= 0)
        ) {
          this.addRoundJoin(
            outerPath,
            outerPath.firstSegment.point,
            path.firstSegment.point,
            Math.abs(offset)
          )
        }
        outerPath.closePath()
      }
      return outerPath
    },

    getOffsetSegments(curve, offset) {
      if (curve.isStraight()) {
        const n = curve.getNormalAtTime(0.5).multiply(offset)
        const p1 = curve.point1.add(n)
        const p2 = curve.point2.add(n)
        return [new Segment(p1), new Segment(p2)]
      } else {
        const curves = this.splitCurveForOffseting(curve)
        const segments = []
        for (let i = 0, l = curves.length; i < l; i++) {
          const offsetCurves = this.getOffsetCurves(curves[i], offset, 0)
          let prevSegment
          for (let j = 0, m = offsetCurves.length; j < m; j++) {
            const curve = offsetCurves[j]
            const segment = curve.segment1
            if (prevSegment) {
              prevSegment.handleOut = segment.handleOut
            } else {
              segments.push(segment)
            }
            segments.push((prevSegment = curve.segment2))
          }
        }
        return segments
      }
    },

    offsetCurve_middle(curve, offset) {
      const v = curve.getValues()
      const p1 = curve.point1.add(Curve.getNormal(v, 0).multiply(offset))
      const p2 = curve.point2.add(Curve.getNormal(v, 1).multiply(offset))
      const pt = Curve.getPoint(v, 0.5).add(
        Curve.getNormal(v, 0.5).multiply(offset)
      )
      const t1 = Curve.getTangent(v, 0)
      const t2 = Curve.getTangent(v, 1)
      const div = (t1.cross(t2) * 3) / 4
      const d = pt.multiply(2).subtract(p1.add(p2))
      const a = d.cross(t2) / div
      const b = d.cross(t1) / div
      return new Curve(p1, t1.multiply(a), t2.multiply(-b), p2)
    },

    offsetCurve_average(curve, offset) {
      const v = curve.getValues()
      const p1 = curve.point1.add(Curve.getNormal(v, 0).multiply(offset))
      const p2 = curve.point2.add(Curve.getNormal(v, 1).multiply(offset))
      const t = this.getAverageTangentTime(v)
      const u = 1 - t
      const pt = Curve.getPoint(v, t).add(
        Curve.getNormal(v, t).multiply(offset)
      )
      const t1 = Curve.getTangent(v, 0)
      const t2 = Curve.getTangent(v, 1)
      const div = t1.cross(t2) * 3 * t * u
      const v2 = pt.subtract(
        p1.multiply(u * u * (1 + 2 * t)).add(p2.multiply(t * t * (3 - 2 * t)))
      )
      const a = v2.cross(t2) / (div * u)
      const b = v2.cross(t1) / (div * t)
      return new Curve(p1, t1.multiply(a), t2.multiply(-b), p2)
    },

    offsetCurve_simple(crv, dist) {
      const p1 = crv.point1.add(crv.getNormalAtTime(0).multiply(dist))
      const p4 = crv.point2.add(crv.getNormalAtTime(1).multiply(dist))
      const pointDist = crv.point1.getDistance(crv.point2)
      let f = p1.getDistance(p4) / pointDist
      if (crv.point2.subtract(crv.point1).dot(p4.subtract(p1)) < 0) {
        f = -f
      }
      return new Curve(p1, crv.handle1.multiply(f), crv.handle2.multiply(f), p4)
    },

    getOffsetCurves(curve, offset, method) {
      const errorThreshold = 0.01
      const radius = Math.abs(offset)
      const offsetMethod = this['offsetCurve_' + (method || 'middle')]
      const that = this

      function offsetCurce(curve, curves, recursion) {
        const offsetCurve = offsetMethod.call(that, curve, offset)
        const cv = curve.getValues()
        const ov = offsetCurve.getValues()
        const count = 16
        let error = 0
        for (let i = 1; i < count; i++) {
          const t = i / count
          const p = Curve.getPoint(cv, t)
          const n = Curve.getNormal(cv, t)
          const roots = Curve.getCurveLineIntersections(ov, p.x, p.y, n.x, n.y)
          let dist = 2 * radius
          for (let j = 0, l = roots.length; j < l; j++) {
            const d = Curve.getPoint(ov, roots[j]).getDistance(p)
            if (d < dist) dist = d
          }
          const err = Math.abs(radius - dist)
          if (err > error) error = err
        }
        if (error > errorThreshold && recursion++ < 8) {
          if (error === radius) {
          }
          const curve2 = curve.divideAtTime(that.getAverageTangentTime(cv))
          offsetCurce(curve, curves, recursion)
          offsetCurce(curve2, curves, recursion)
        } else {
          curves.push(offsetCurve)
        }
        return curves
      }

      return offsetCurce(curve, [], 0)
    },

    splitCurveForOffseting(curve) {
      const curves = [curve.clone()]
      if (curve.isStraight()) return curves

      function splitAtRoots(index, roots) {
        for (let i = 0, prevT, l = roots && roots.length; i < l; i++) {
          const t = roots[i]
          const curve = curves[index].divideAtTime(
            i ? (t - prevT) / (1 - prevT) : t
          )
          prevT = t
          if (curve) curves.splice(++index, 0, curve)
        }
      }

      const info = curve.classify()
      if (info.roots && info.type !== 'loop') {
        splitAtRoots(0, info.roots)
      }

      for (let i = curves.length - 1; i >= 0; i--) {
        splitAtRoots(i, Curve.getPeaks(curves[i].getValues()))
      }

      return curves
    },

    getAverageTangentTime(v) {
      const tan = Curve.getTangent(v, 0).add(Curve.getTangent(v, 1))
      const tx = tan.x
      const ty = tan.y
      const abs = Math.abs
      const flip = abs(ty) < abs(tx)
      const s = flip ? ty / tx : tx / ty
      const ia = flip ? 1 : 0 // the abscissa index
      const io = ia ^ 1 // the ordinate index
      const a0 = v[ia + 0]
      const o0 = v[io + 0]
      const a1 = v[ia + 2]
      const o1 = v[io + 2]
      const a2 = v[ia + 4]
      const o2 = v[io + 4]
      const a3 = v[ia + 6]
      const o3 = v[io + 6]
      const aA = -a0 + 3 * a1 - 3 * a2 + a3
      const aB = 3 * a0 - 6 * a1 + 3 * a2
      const aC = -3 * a0 + 3 * a1
      const oA = -o0 + 3 * o1 - 3 * o2 + o3
      const oB = 3 * o0 - 6 * o1 + 3 * o2
      const oC = -3 * o0 + 3 * o1
      const roots = []
      const epsilon = Numerical.CURVETIME_EPSILON
      const count = Numerical.solveQuadratic(
        3 * (aA - s * oA),
        2 * (aB - s * oB),
        aC - s * oC,
        roots,
        epsilon,
        1 - epsilon
      )
      // Fall back to 0.5, so we always have a place to split...
      return count > 0 ? roots[0] : 0.5
    },

    addRoundJoin(path, dest, center, radius) {
      const middle = path.lastSegment.point.add(dest).divide(2)
      const through = center.add(middle.subtract(center).normalize(radius))
      path.arcTo(through, dest)
    },
  }
}
