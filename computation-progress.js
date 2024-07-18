(() => {
  "use strict";
  var e = function (e, t, n, o) {
    return new (n || (n = Promise))(function (r, u) {
      function a(e) {
        try {
          s(o.next(e));
        } catch (e) {
          u(e);
        }
      }
      function i(e) {
        try {
          s(o.throw(e));
        } catch (e) {
          u(e);
        }
      }
      function s(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(a, i);
      }
      s((o = o.apply(e, t || [])).next());
    });
  };
  function t(e, t) {
    const n = t
        ? document.getElementById(t)
        : document.getElementsByTagName("body")[0],
      o = document.createElement("p");
    (o.innerText = e), n.appendChild(o);
  }
  function n(e) {
    const t = document.getElementById("error-flags"),
      n = document.getElementById("no-error");
    n && (n.outerHTML = ""),
      (t.style.color = "red"),
      (t.innerText += e.toString() + "\n");
  }
  document.addEventListener("DOMContentLoaded", () => {
    try {
      !(function (o) {
        e(this, void 0, void 0, function* () {
          const r = yield (() =>
              e(this, void 0, void 0, function* () {
                try {
                  return yield navigator.gpu.requestAdapter();
                } catch (e) {
                  throw (
                    (n("The browser does not support WebGPU."),
                    new Error("The browser does not support WebGPU."))
                  );
                }
              }))(),
            u = yield r.requestDevice(),
            a = u.createShaderModule({
              label: "doublin compute module",
              code: "@group(0) @binding(0) var<storage, read_write> data: array<f32>;\r\n\r\n@compute @workgroup_size(1) fn computeSomething(\r\n  @builtin(global_invocation_id) id: vec3u\r\n) {\r\n  let i = id.x;\r\n  data[i] = data[i] * 2.0;\r\n}",
            }),
            i = u.createComputePipeline({
              label: "coubling compute pipeline",
              layout: "auto",
              compute: { module: a },
            }),
            s = new Float32Array(o || [1, 3, 5]),
            c = u.createBuffer({
              label: "work buffer",
              size: s.byteLength,
              usage:
                GPUBufferUsage.STORAGE |
                GPUBufferUsage.COPY_SRC |
                GPUBufferUsage.COPY_DST,
            });
          u.queue.writeBuffer(c, 0, s);
          const d = u.createBuffer({
              label: "result buffer",
              size: s.byteLength,
              usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
            }),
            l = u.createBindGroup({
              label: "bindGroup for work buffer",
              layout: i.getBindGroupLayout(0),
              entries: [{ binding: 0, resource: { buffer: c } }],
            }),
            f = u.createCommandEncoder({ label: "doubling encoder" }),
            p = f.beginComputePass({ label: "doubling compute pass" });
          p.setPipeline(i),
            p.setBindGroup(0, l),
            p.dispatchWorkgroups(s.length),
            p.end(),
            f.copyBufferToBuffer(c, 0, d, 0, d.size),
            u.queue.submit([f.finish()]),
            yield d.mapAsync(GPUMapMode.READ);
          const g = new Float32Array(d.getMappedRange());
          console.log("input ", s),
            console.log("result ", g),
            t("Input matrix:", "message-box"),
            t(`[ ${s.map((e) => e).join(" , ")} ]`, "message-box"),
            t("Output matrix:", "message-box"),
            t(`[ ${g.map((e) => e).join(" , ")} ]`, "message-box"),
            d.unmap();
        });
      })([
        22, 23, 24, 35, 40, 148, 90, 220, 42, 105, 246, 60, 62, 155, 244, 54,
        188, 63, 46, 66, 108, 178, 123, 223, 103, 166, 131, 189, 222, 61, 235,
        241, 50, 20, 170, 154, 45, 12, 213, 32, 5, 91, 137, 48, 82, 185, 255,
        222, 136, 105, 161, 196, 134, 209, 120, 195, 56, 154, 222, 143, 39, 153,
        178, 108, 251, 222, 17, 2, 69, 69, 196, 196, 213, 62, 185, 235, 218,
        168, 69, 49, 15, 22, 95, 92, 239, 51, 164, 0, 76, 77, 202, 36, 135, 61,
        163, 120, 223, 174, 3, 245, 149, 212, 147, 183, 86, 251, 194, 194, 238,
        92, 183, 198, 175, 186, 80, 15, 27, 236, 178, 142, 61, 149, 1, 129, 120,
        114, 188, 15, 182, 106, 61, 11, 84, 25, 172, 132, 254, 140, 222, 233,
        158, 245, 196, 248, 198, 147, 37, 27, 197, 65, 107, 17, 40, 229, 182,
        193, 10, 92, 248, 9, 192, 204, 231, 64, 108, 108, 139, 134, 62, 175, 27,
        54, 191, 204, 31, 23, 131, 20, 172, 64, 182, 106, 171, 37, 153, 143,
        198, 217, 174, 103, 14, 29, 9, 6, 239, 242, 203, 93, 217, 10, 180, 91,
        19, 220, 93, 114, 97, 22, 58, 51, 158, 243, 231, 210, 111, 27, 172, 34,
        133, 90, 65, 6, 165, 176, 145, 172, 230, 65, 7, 28, 189, 250, 70, 62,
        185, 57, 184, 12, 61, 12, 118, 128, 173, 123, 199, 26, 255, 137, 26, 80,
        178, 54, 12, 97, 23, 254, 68,
      ]);
    } catch (e) {
      console.log("Error reached"), n(e.message);
    }
  });
})();
