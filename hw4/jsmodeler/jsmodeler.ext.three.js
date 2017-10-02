/* JSModeler 0.43 - http://www.github.com/kovacsv/JSModeler */ 'use strict';JSM.ConvertBodyToThreeMeshes=function(a,b,d){var c={textureLoadedCallback:null,hasConvexPolygons:!1};void 0!==d&&null!==d&&(c.textureLoadedCallback=JSM.ValueOrDefault(d.textureLoadedCallback,c.textureLoadedCallback),c.hasConvexPolygons=JSM.ValueOrDefault(d.hasConvexPolygons,c.hasConvexPolygons));var f=[],e=null,g=null;JSM.ExplodeBody(a,b,{hasConvexPolygons:c.hasConvexPolygons,onPointGeometryStart:function(a){g=new THREE.PointsMaterial({color:a.diffuse,size:a.pointSize});e=new THREE.Geometry},
onPointGeometryEnd:function(){var a=new THREE.Points(e,g);f.push(a)},onPoint:function(a){e.vertices.push(new THREE.Vector3(a.x,a.y,a.z))},onLineGeometryStart:function(a){e=new THREE.Geometry;g=new THREE.LineBasicMaterial({color:a.diffuse})},onLineGeometryEnd:function(){var a=new THREE.LineSegments(e,g);f.push(a)},onLine:function(a,b){e.vertices.push(new THREE.Vector3(a.x,a.y,a.z));e.vertices.push(new THREE.Vector3(b.x,b.y,b.z))},onGeometryStart:function(a){var b=null!==a.texture,d=1!==a.opacity,f=
a.diffuse,F=a.specular,u=a.shininess;0===u&&(F=0,u=1);g=new THREE.MeshPhongMaterial({color:f,specular:F,shininess:u});a.singleSided||(g.side=THREE.DoubleSide);d&&(g.opacity=a.opacity,g.transparent=!0);if(b){var n=g;a=a.texture;(new THREE.TextureLoader).load(a,function(a){a.image=JSM.ResizeImageToPowerOfTwoSides(a.image);a.wrapS=THREE.RepeatWrapping;a.wrapT=THREE.RepeatWrapping;n.map=a;n.needsUpdate=!0;null!==c.textureLoadedCallback&&c.textureLoadedCallback()})}e=new THREE.Geometry},onGeometryEnd:function(){e.computeFaceNormals();
var a=new THREE.Mesh(e,g);f.push(a)},onTriangle:function(a,b,c,d,g,f,n,E,l){var p=e.vertices.length;e.vertices.push(new THREE.Vector3(a.x,a.y,a.z));e.vertices.push(new THREE.Vector3(b.x,b.y,b.z));e.vertices.push(new THREE.Vector3(c.x,c.y,c.z));a=new THREE.Face3(p+0,p+1,p+2);e.faces.push(a);null!==d&&(null!==g&&null!==f)&&(a=[],a.push(new THREE.Vector3(d.x,d.y,d.z)),a.push(new THREE.Vector3(g.x,g.y,g.z)),a.push(new THREE.Vector3(f.x,f.y,f.z)),e.faces[e.faces.length-1].vertexNormals=a);null!==n&&(null!==
E&&null!==l)&&(d=[],d.push(new THREE.Vector2(n.x,-n.y)),d.push(new THREE.Vector2(E.x,-E.y)),d.push(new THREE.Vector2(l.x,-l.y)),e.faceVertexUvs[0].push(d))}});return f};JSM.ConvertModelToThreeMeshes=function(a,b){var d=[],c=a.GetMaterialSet(),f,e,g;for(f=0;f<a.BodyCount();f++){e=a.GetBody(f);g=JSM.ConvertBodyToThreeMeshes(e,c,b);for(e=0;e<g.length;e++)d.push(g[e])}return d};
JSM.ConvertJSONDataToThreeMeshes=function(a,b,d){function c(a,d,c,e){function g(a,c,e,f,k,p){function n(a,b,c,d,e){var f=new THREE.Vector2(a,b);if(!JSM.IsZero(e)){var g=Math.sin(e*JSM.DegRad);e=Math.cos(e*JSM.DegRad);f.x=e*a-g*b;f.y=g*a+e*b}f.x=c[0]+f.x*d[0];f.y=c[1]+f.y*d[1];return f}var q=a.parameters,h=k[a.material];a=h.texture;k=h.offset;var l=h.scale,v=h.rotation,w=new THREE.Color,t=new THREE.Color,x=h.shininess||0;w.setRGB(h.diffuse[0],h.diffuse[1],h.diffuse[2]);t.setRGB(h.specular[0],h.specular[1],
h.specular[2]);if(void 0!==a&&null!==a){w.setRGB(1,1,1);t.setRGB(1,1,1);if(void 0===k||null===k)k=[0,0];if(void 0===l||null===l)l=[1,1];if(void 0===v||null===v)v=0}0===x&&(t.setRGB(0,0,0),x=1);var y=new THREE.MeshPhongMaterial({color:w.getHex(),specular:t.getHex(),shininess:x,side:THREE.DoubleSide});1!==h.opacity&&(y.opacity=h.opacity,y.transparent=!0);void 0!==a&&null!==a&&(new THREE.TextureLoader).load(a,function(a){a.image=JSM.ResizeImageToPowerOfTwoSides(a.image);a.wrapS=THREE.RepeatWrapping;
a.wrapT=THREE.RepeatWrapping;y.map=a;y.needsUpdate=!0;void 0!==b&&null!==b&&b()});var h=new THREE.Geometry,r,z,A,s,B,C,D,u,m;for(m=0;m<q.length;m+=9)r=3*q[m+0],z=3*q[m+1],A=3*q[m+2],s=3*q[m+3],B=3*q[m+4],C=3*q[m+5],w=2*q[m+6],t=2*q[m+7],x=2*q[m+8],D=h.vertices.length,u=h.faces.length,h.vertices.push(new THREE.Vector3(c[r+0],c[r+1],c[r+2])),h.vertices.push(new THREE.Vector3(c[z+0],c[z+1],c[z+2])),h.vertices.push(new THREE.Vector3(c[A+0],c[A+1],c[A+2])),h.faces.push(new THREE.Face3(D+0,D+1,D+2)),r=
[],r.push(new THREE.Vector3(e[s+0],e[s+1],e[s+2])),r.push(new THREE.Vector3(e[B+0],e[B+1],e[B+2])),r.push(new THREE.Vector3(e[C+0],e[C+1],e[C+2])),h.faces[u].vertexNormals=r,void 0!==a&&null!==a&&(s=[],s.push(n(f[w+0],f[w+1],k,l,v)),s.push(n(f[t+0],f[t+1],k,l,v)),s.push(n(f[x+0],f[x+1],k,l,v)),h.faceVertexUvs[0].push(s));c=new THREE.Mesh(h,y);c.originalJsonIndex=d;p.push(c)}var f=a.vertices;if(void 0!==f){var k=a.normals;if(void 0!==k){var l=a.uvs;if(void 0!==l){a=a.triangles;var p;for(p=0;p<a.length;p++)g(a[p],
f,k,l,c,e)}}}}var f=[],e=a.materials;if(void 0===e)return f;var g=a.meshes;if(void 0===g)return f;var k=0;JSM.AsyncRunTask(function(){c(g[k],k,e,f);k+=1;return!0},d,g.length,0,f);return f};JSM.ThreeViewer=function(){this.enableDraw=this.drawLoop=this.settings=this.navigation=this.cameraMove=this.runAfterRender=this.runBeforeRender=this.directionalLight=this.ambientLight=this.renderer=this.camera=this.scene=this.canvas=null};
JSM.ThreeViewer.prototype.Start=function(a,b){if(!JSM.IsWebGLEnabled()||!this.InitSettings(b)||!this.InitThree(a)||!this.InitCamera(b)||!this.InitLights())return!1;this.drawLoop=!1;this.enableDraw=!0;this.DrawIfNeeded();return!0};
JSM.ThreeViewer.prototype.InitSettings=function(a){this.settings={cameraEyePosition:new JSM.Coord(1,1,1),cameraCenterPosition:new JSM.Coord(0,0,0),cameraUpVector:new JSM.Coord(0,0,1),lightAmbientColor:[0.5,0.5,0.5],lightDiffuseColor:[0.5,0.5,0.5]};void 0!==a&&(void 0!==a.cameraEyePosition&&(this.settings.cameraEyePosition=JSM.CoordFromArray(a.cameraEyePosition)),void 0!==a.cameraCenterPosition&&(this.settings.cameraCenterPosition=JSM.CoordFromArray(a.cameraCenterPosition)),void 0!==a.cameraUpVector&&
(this.settings.cameraUpVector=JSM.CoordFromArray(a.cameraUpVector)),void 0!==a.lightAmbientColor&&(this.settings.lightAmbientColor=a.lightAmbientColor),void 0!==a.lightDiffuseColor&&(this.settings.lightDiffuseColor=a.lightDiffuseColor));return!0};
JSM.ThreeViewer.prototype.InitThree=function(a){this.canvas=a;if(!this.canvas||!this.canvas.getContext)return!1;this.scene=new THREE.Scene;if(!this.scene)return!1;this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,antialias:!0});if(!this.renderer)return!1;this.renderer.setClearColor(new THREE.Color(16777215));this.renderer.setSize(this.canvas.width,this.canvas.height);return!0};
JSM.ThreeViewer.prototype.InitCamera=function(a){this.cameraMove=new JSM.Camera(JSM.CoordFromArray(a.cameraEyePosition),JSM.CoordFromArray(a.cameraCenterPosition),JSM.CoordFromArray(a.cameraUpVector),a.fieldOfView,a.nearClippingPlane,a.farClippingPlane);if(!this.cameraMove)return!1;this.navigation=new JSM.Navigation;if(!this.navigation.Init(this.canvas,this.cameraMove,this.DrawIfNeeded.bind(this),this.Resize.bind(this)))return!1;this.camera=new THREE.PerspectiveCamera(this.cameraMove.fieldOfView,
this.canvas.width/this.canvas.height,this.cameraMove.nearClippingPlane,this.cameraMove.farClippingPlane);if(!this.camera)return!1;this.scene.add(this.camera);return!0};
JSM.ThreeViewer.prototype.InitLights=function(){var a=new THREE.Color,b=new THREE.Color;a.setRGB(this.settings.lightAmbientColor[0],this.settings.lightAmbientColor[1],this.settings.lightAmbientColor[2]);b.setRGB(this.settings.lightDiffuseColor[0],this.settings.lightDiffuseColor[1],this.settings.lightDiffuseColor[2]);this.ambientLight=new THREE.AmbientLight(a.getHex());if(!this.ambientLight)return!1;this.scene.add(this.ambientLight);this.directionalLight=new THREE.DirectionalLight(b.getHex());if(!this.directionalLight)return!1;
a=(new THREE.Vector3).subVectors(this.cameraMove.eye,this.cameraMove.center);this.directionalLight.position.set(a.x,a.y,a.z);this.scene.add(this.directionalLight);return!0};JSM.ThreeViewer.prototype.SetRunBeforeRender=function(a){this.runBeforeRender=a};JSM.ThreeViewer.prototype.SetRunAfterRender=function(a){this.runAfterRender=a};JSM.ThreeViewer.prototype.SetClearColor=function(a){this.renderer.setClearColor(new THREE.Color(a));this.DrawIfNeeded()};
JSM.ThreeViewer.prototype.AddMesh=function(a){this.scene.add(a);this.DrawIfNeeded()};JSM.ThreeViewer.prototype.AddMeshes=function(a){var b;for(b=0;b<a.length;b++)this.scene.add(a[b]);this.DrawIfNeeded()};JSM.ThreeViewer.prototype.MeshCount=function(){var a=0,b=this;this.scene.traverse(function(d){b.IsRelevantObject(d)&&(a+=1)});return a};JSM.ThreeViewer.prototype.VertexCount=function(){var a=0,b=this;this.scene.traverse(function(d){b.IsRelevantObject(d)&&(a+=d.geometry.vertices.length)});return a};
JSM.ThreeViewer.prototype.FaceCount=function(){var a=0;this.scene.traverse(function(b){b instanceof THREE.Mesh&&(a+=b.geometry.faces.length)});return a};JSM.ThreeViewer.prototype.GetMesh=function(a){var b=null,d=0,c;for(c=0;c<this.scene.children.length;c++)if(b=this.scene.children[c],this.IsRelevantObject(b)){if(d==a)return b;d+=1}return null};JSM.ThreeViewer.prototype.RemoveMesh=function(a){a.geometry.dispose();this.scene.remove(a);this.DrawIfNeeded()};
JSM.ThreeViewer.prototype.RemoveMeshes=function(){var a,b;for(b=0;b<this.scene.children.length;b++)a=this.scene.children[b],this.IsRelevantObject(a)&&(a.geometry.dispose(),this.scene.remove(a),b--);this.DrawIfNeeded()};JSM.ThreeViewer.prototype.RemoveLastMesh=function(){var a=null,b=this;this.scene.traverse(function(d){b.IsRelevantObject(d)&&(a=d)});null!==a&&this.scene.remove(a);this.DrawIfNeeded()};
JSM.ThreeViewer.prototype.SetCamera=function(a,b,d){this.navigation.SetCamera(a,b,d);this.navigation.SetOrbitCenter(b.Clone());this.DrawIfNeeded()};JSM.ThreeViewer.prototype.Resize=function(){this.camera.aspect=this.canvas.width/this.canvas.height;this.camera.updateProjectionMatrix();this.renderer.setSize(this.canvas.width,this.canvas.height);this.DrawIfNeeded()};
JSM.ThreeViewer.prototype.FitInWindow=function(){if(0!==this.MeshCount()){var a=this.GetBoundingSphere();this.navigation.FitInWindow(a.GetCenter(),a.GetRadius());this.DrawIfNeeded()}};JSM.ThreeViewer.prototype.AdjustClippingPlanes=function(a){this.GetBoundingSphere().GetRadius()<a?(this.camera.near=0.1,this.camera.far=1E3):(this.camera.near=10,this.camera.far=1E6);this.camera.updateProjectionMatrix();this.Draw()};JSM.ThreeViewer.prototype.GetCenter=function(){return this.GetBoundingBox().GetCenter()};
JSM.ThreeViewer.prototype.GetBoundingBox=function(){var a=new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf),b=new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf),d,c,f=this;this.scene.traverse(function(e){if(f.IsRelevantObject(e)){d=e.geometry;var g;for(g=0;g<d.vertices.length;g++)c=d.vertices[g].clone(),c.add(e.position),a.x=JSM.Minimum(a.x,c.x),a.y=JSM.Minimum(a.y,c.y),a.z=JSM.Minimum(a.z,c.z),b.x=JSM.Maximum(b.x,c.x),b.y=JSM.Maximum(b.y,c.y),b.z=JSM.Maximum(b.z,c.z)}});return new JSM.Box(a,b)};
JSM.ThreeViewer.prototype.GetBoundingSphere=function(){var a=this.GetCenter(),b=0,d,c,f,e=this;this.scene.traverse(function(g){if(e.IsRelevantObject(g)){d=g.geometry;var k;for(k=0;k<d.vertices.length;k++)c=d.vertices[k].clone(),c.add(g.position),f=a.DistanceTo(new JSM.Coord(c.x,c.y,c.z)),JSM.IsGreater(f,b)&&(b=f)}});return new JSM.Sphere(a,b)};
JSM.ThreeViewer.prototype.GetObjectsUnderPosition=function(a,b){var d=this.camera.position,c=new THREE.Vector3(2*(a/this.canvas.width)-1,2*-(b/this.canvas.height)+1,0.5);c.unproject(this.camera);c.sub(d);c.normalize();return(new THREE.Raycaster(d,c)).intersectObjects(this.scene.children)};JSM.ThreeViewer.prototype.GetObjectsUnderMouse=function(){return this.GetObjectsUnderPosition(this.navigation.mouse.curr.x,this.navigation.mouse.curr.y)};
JSM.ThreeViewer.prototype.GetObjectsUnderTouch=function(){return this.GetObjectsUnderPosition(this.navigation.touch.curr.x,this.navigation.touch.curr.y)};JSM.ThreeViewer.prototype.ProjectVector=function(a,b,d){var c=this.canvas.width/2,f=this.canvas.height/2;a=new THREE.Vector3(a,b,d);a.project(this.camera);a.x=a.x*c+c;a.y=-(a.y*f)+f;return a};JSM.ThreeViewer.prototype.EnableDraw=function(a){this.enableDraw=a};
JSM.ThreeViewer.prototype.Draw=function(){if(this.enableDraw){null!==this.runBeforeRender&&this.runBeforeRender();this.camera.position.set(this.cameraMove.eye.x,this.cameraMove.eye.y,this.cameraMove.eye.z);this.camera.up.set(this.cameraMove.up.x,this.cameraMove.up.y,this.cameraMove.up.z);this.camera.lookAt(new THREE.Vector3(this.cameraMove.center.x,this.cameraMove.center.y,this.cameraMove.center.z));var a=(new THREE.Vector3).subVectors(this.cameraMove.eye,this.cameraMove.center);this.directionalLight.position.set(a.x,
a.y,a.z);this.renderer.render(this.scene,this.camera);null!==this.runAfterRender&&this.runAfterRender();this.drawLoop&&requestAnimationFrame(this.Draw.bind(this))}};JSM.ThreeViewer.prototype.DrawIfNeeded=function(){this.drawLoop||this.Draw()};JSM.ThreeViewer.prototype.StartDrawLoop=function(){this.drawLoop=!0;this.Draw()};JSM.ThreeViewer.prototype.IsRelevantObject=function(a){return a instanceof THREE.Mesh||a instanceof THREE.LineSegments||a instanceof THREE.Points};
