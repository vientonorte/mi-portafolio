/**
 * Prototipo estático /ar.
 * MindAR (imagen) + A-Frame. La cámara solo arranca con el botón.
 * La geometría vive en curves.json, el mismo archivo que dibuja la vista previa.
 */
(function () {
  const ORANGE = "#FF931E";
  const COPY = {
    lissajous: {
      kicker: "Blanco 1",
      name: "Lissajous 3:4",
      equation: "x = sin 3t    y = sin 4t",
      line1: "Dos senos, en razón 3 a 4, cierran una sola figura.",
      line2: "El trazo naranja la vuelve a dibujar sobre el papel.",
    },
    trebol: {
      kicker: "Blanco 2",
      name: "Nudo trébol",
      equation: "x = sin t + 2 sin 2t    y = cos t − 2 cos 2t",
      line1: "Es el nudo más simple: no se deshace sin cortar el hilo.",
      line2: "El trazo naranja recorre la curva y levanta cada cruce.",
    },
    penrose: {
      kicker: "Blanco 3 · Veritasium",
      name: "Diagrama de Penrose",
      equation:
        "Diagrama de Penrose de un agujero negro con caminos de Feynman. Crédito: Veritasium.",
      line1: "El rombo aplana el espacio-tiempo: la luz corre por los bordes.",
      line2: "El resalte naranja recorre el contorno y un camino que lo cruza.",
    },
  };

  const SEARCHING = {
    kicker: "Cámara activa",
    name: "Buscando un blanco",
    equation: "",
    line1: "Llena el encuadre con la figura, sobre la mesa y sin reflejo.",
    line2: "Si no engancha, acércala y mantén el teléfono paralelo al papel.",
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startBtn = document.getElementById("start");
  const fallbackEl = document.getElementById("fallback");
  const sheet = document.getElementById("sheet");
  const viewport = document.getElementById("viewport");

  let curves = null;
  let sceneEl = null;
  let seen = [];

  function showFallback(message) {
    fallbackEl.hidden = false;
    fallbackEl.textContent = message;
  }

  function cameraMessage(error) {
    const name = error && error.name;
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      return "El navegador bloqueó la cámara. Permite el acceso en este sitio y pulsa Activar cámara otra vez.";
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      return "No hay cámara en este dispositivo. Imprime los blancos y abre la página en un teléfono.";
    }
    if (name === "NotReadableError" || name === "TrackStartError") {
      return "La cámara está ocupada por otra aplicación. Ciérrala y vuelve a intentar.";
    }
    return "No se pudo abrir la cámara. Imprime los blancos y prueba en un teléfono con HTTPS.";
  }

  function installCameraFallback() {
    if (!navigator.mediaDevices || navigator.mediaDevices.__vnPatched) return;
    const native = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return native(constraints).catch(function (err) {
        const video = constraints && constraints.video;
        if (video && typeof video === "object" && "facingMode" in video) {
          return native({ audio: false, video: true });
        }
        throw err;
      });
    };
    navigator.mediaDevices.__vnPatched = true;
  }

  function renderSheet(block) {
    const eq = block.equation
      ? '<p class="eq"><span class="visually-hidden">Ecuación. </span>' + escapeHtml(block.equation) + "</p>"
      : "";
    sheet.innerHTML =
      '<p class="kicker">' + escapeHtml(block.kicker) + "</p>" +
      "<h2>" + escapeHtml(block.name) + "</h2>" +
      eq +
      "<p>" + escapeHtml(block.line1) + "</p>" +
      "<p>" + escapeHtml(block.line2) + "</p>" +
      '<div class="sheet-actions"><button type="button" id="stop">Detener cámara</button></div>';
    const stop = document.getElementById("stop");
    stop.addEventListener("click", stopCamera);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showTarget(key) {
    seen = seen.filter(function (item) { return item !== key; });
    seen.push(key);
    renderSheet(COPY[key]);
  }

  function hideTarget(key) {
    seen = seen.filter(function (item) { return item !== key; });
    renderSheet(seen.length ? COPY[seen[seen.length - 1]] : SEARCHING);
  }

  window.VN_AR_SHOW = showTarget;
  window.VN_AR_HIDE = hideTarget;

  function markerToPixel(point, width, height) {
    return [(point[0] + 0.5) * width, height / 2 - point[1] * width];
  }

  function strokePaths(ctx, spec, paths, progress) {
    const pieces = paths.filter(function (path) { return path && path.length > 1; });
    const total = pieces.reduce(function (sum, path) { return sum + path.length; }, 0);
    let budget = Math.max(2, Math.round(progress * total));
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = ORANGE;
    ctx.lineWidth = Math.max(8, spec.width / 70);
    pieces.forEach(function (path, index) {
      const take = Math.min(path.length, budget);
      budget -= take;
      if (take < 2) return;
      ctx.beginPath();
      for (let i = 0; i < take; i += 1) {
        const xy = markerToPixel(path[i], spec.width, spec.height);
        if (i === 0) ctx.moveTo(xy[0], xy[1]);
        else ctx.lineTo(xy[0], xy[1]);
      }
      if (spec.closed[index] && take === path.length) {
        const xy = markerToPixel(path[0], spec.width, spec.height);
        ctx.lineTo(xy[0], xy[1]);
      }
      ctx.stroke();
    });
  }

  function mountPreviews() {
    const started = performance.now();
    const frames = Array.prototype.map.call(
      document.querySelectorAll(".plate"),
      function (figure) {
        const key = figure.getAttribute("data-curve");
        const spec = curves[key];
        const canvas = figure.querySelector("canvas");
        const img = figure.querySelector("img");
        canvas.width = spec.width;
        canvas.height = spec.height;
        return { spec: spec, canvas: canvas, img: img, paths: spec.ink || spec.paths };
      }
    );

    function frame(now) {
      const t = reduceMotion ? 1 : ((now - started) % 5200) / 4000;
      const progress = Math.min(t, 1);
      frames.forEach(function (item) {
        const ctx = item.canvas.getContext("2d");
        ctx.clearRect(0, 0, item.spec.width, item.spec.height);
        strokePaths(ctx, item.spec, item.paths, progress);
      });
      if (!reduceMotion) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    frames.forEach(function (item) {
      if (item.img.complete) return;
      item.img.addEventListener("load", function () {
        item.canvas.width = item.spec.width;
        item.canvas.height = item.spec.height;
      });
    });
  }

  function registerTrace() {
    if (window.__vnTrace) return;
    window.__vnTrace = true;
    const THREE = window.AFRAME.THREE;
    window.AFRAME.registerComponent("vn-trace", {
      schema: { key: { type: "string" } },
      init: function () {
        const spec = curves[this.data.key];
        this.meshes = [];
        const self = this;
        spec.paths.forEach(function (path, index) {
          if (!path || path.length < 2) return;
          const closed = Boolean(spec.closed[index]) && path.length > 2;
          const pts = path.map(function (p) {
            return new THREE.Vector3(p[0], p[1], p[2] || 0);
          });
          const curve = pts.length < 3
            ? new THREE.LineCurve3(pts[0], pts[1])
            : new THREE.CatmullRomCurve3(pts, closed, "centripetal");
          const segments = Math.max(12, Math.min(pts.length, 360));
          const geo = new THREE.TubeGeometry(curve, segments, spec.radius || 0.012, 5, closed);
          const mesh = new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({ color: 0xff931e, depthTest: true })
          );
          mesh.frustumCulled = false;
          geo.setDrawRange(0, 0);
          self.el.object3D.add(mesh);
          self.meshes.push(mesh);
        });
        this.running = false;
        this.t0 = 0;
        const anchor = this.el.parentEl;
        anchor.addEventListener("targetFound", function () {
          self.running = true;
          self.t0 = performance.now();
          window.VN_AR_SHOW(self.data.key);
        });
        anchor.addEventListener("targetLost", function () {
          self.running = false;
          window.VN_AR_HIDE(self.data.key);
        });
      },
      tick: function () {
        let progress = 0;
        if (this.running && reduceMotion) progress = 1;
        else if (this.running) {
          const elapsed = (performance.now() - this.t0) % 5600;
          progress = Math.min(elapsed / 4200, 1);
        }
        this.meshes.forEach(function (mesh) {
          const geo = mesh.geometry;
          const total = geo.index ? geo.index.count : geo.attributes.position.count;
          geo.setDrawRange(0, Math.floor(progress * total));
        });
      },
    });
  }

  function mountScene() {
    registerTrace();
    const scene = document.createElement("a-scene");
    scene.setAttribute("embedded", "");
    scene.setAttribute("vr-mode-ui", "enabled: false");
    scene.setAttribute("device-orientation-permission-ui", "enabled: false");
    scene.setAttribute("loading-screen", "enabled: false");
    scene.setAttribute("renderer", "alpha: true; colorManagement: true; antialias: true");
    scene.setAttribute("color-space", "sRGB");
    scene.setAttribute(
      "mindar-image",
      "imageTargetSrc: /ar/targets.mind; autoStart: false; maxTrack: 3; uiLoading: no; uiScanning: no; uiError: no;"
    );
    viewport.insertBefore(scene, sheet);
    scene.insertAdjacentHTML(
      "beforeend",
      '<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>' +
        '<a-entity mindar-image-target="targetIndex: 0"><a-entity vn-trace="key: lissajous"></a-entity></a-entity>' +
        '<a-entity mindar-image-target="targetIndex: 1"><a-entity vn-trace="key: trebol"></a-entity></a-entity>' +
        '<a-entity mindar-image-target="targetIndex: 2"><a-entity vn-trace="key: penrose"></a-entity></a-entity>'
    );
    sceneEl = scene;
    scene.addEventListener("loaded", function () {
      const renderer = scene.renderer;
      if (renderer) {
        renderer.setClearColor(0x000000, 0);
        renderer.setClearAlpha(0);
      }
      startBtn.disabled = false;
      startBtn.textContent = "Activar cámara";
    });
    if (scene.hasLoaded) startBtn.disabled = false;
    scene.addEventListener("arError", function () {
      leaveStage(
        "No se pudo abrir la cámara. Revisa el permiso del sitio, o imprime los blancos y ábrelo en un teléfono con HTTPS."
      );
    });
  }

  function leaveStage(message) {
    document.body.classList.remove("is-live");
    viewport.setAttribute("aria-hidden", "true");
    if (message) showFallback(message);
    startBtn.disabled = false;
    startBtn.textContent = "Activar cámara";
  }

  function stopCamera() {
    const system = sceneEl && sceneEl.systems["mindar-image-system"];
    try {
      if (system && system.controller && system.video) system.stop();
      else if (system && system.video && system.video.srcObject) {
        system.video.srcObject.getTracks().forEach(function (track) { track.stop(); });
        system.video.remove();
      }
    } catch (err) {
      /* el sistema puede no haber arrancado */
    }
    leaveStage("");
    fallbackEl.hidden = true;
  }

  function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showFallback(
        "No hay cámara disponible en este navegador. Imprime los tres blancos y abre esta página en un teléfono, con HTTPS."
      );
      return;
    }
    const system = sceneEl && sceneEl.systems["mindar-image-system"];
    if (!system) {
      showFallback("El motor de realidad aumentada todavía no está listo. Recarga la página.");
      return;
    }
    fallbackEl.hidden = true;
    installCameraFallback();
    document.body.classList.add("is-live");
    viewport.setAttribute("aria-hidden", "false");
    sheet.hidden = false;
    renderSheet(SEARCHING);
    startBtn.textContent = "Abriendo cámara…";
    try {
      system.start();
    } catch (err) {
      leaveStage(cameraMessage(err));
    }
  }

  function boot() {
    const missing = !window.AFRAME || !window.AFRAME.components || !window.AFRAME.components["mindar-image"];
    if (missing) {
      startBtn.disabled = true;
      showFallback("No se pudo cargar MindAR o A-Frame. Recarga la página.");
      return;
    }
    fetch("/ar/curves.json")
      .then(function (res) {
        if (!res.ok) throw new Error("curves");
        return res.json();
      })
      .then(function (data) {
        curves = data;
        mountPreviews();
        mountScene();
      })
      .catch(function () {
        showFallback("No se pudo cargar la geometría de las curvas. Recarga la página.");
      });
    startBtn.addEventListener("click", startCamera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
