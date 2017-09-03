obj={}
require("socket.io").listen(
require("http").createServer((req,res)=>{
res.writeHead(200,{"content-type":"text/html"})
res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
res.write('<script>io().on("msg",(e)=>{eval(e.script)})</script>')
res.end()
}).listen(process.env.PORT||3000,()=>{console.log("Здравствуйте?")})
).on("connection",(w)=>{
w.i=Math.random()
obj[w.i]={x:0,y:0,xs:1,ys:0}
w.emit("msg",{script:'k=[]'})
w.emit("msg",{script:'document.body.style.margin="0"'})
w.emit("msg",{script:'c=document.createElement("canvas")'})
w.emit("msg",{script:'document.body.appendChild(c)'})
w.emit("msg",{script:'ctx=c.getContext("2d")'})
w.emit("msg",{script:'onkeydown=onkeyup=(e)=>{k[e.keyCode]=e.type=="keydown"}'})
w.emit("msg",{script:'setInterval(()=>{for(i=0;i<400;i++){if(k[i]){io().emit("key",{code:i})}}}'},1)
w.on("key",(e)=>{
console.log(e.code+" from "+w.i)
if(e.code==37){obj[w.i].xs-=0.1}
if(e.code==38){obj[w.i].ys-=0.1}
if(e.code==39){obj[w.i].xs+=0.1}
if(e.code==40){obj[w.i].ys+=0.1}
})
setInterval(()=>{
w.emit("msg",{script:'c.width=innerWidth'})
w.emit("msg",{script:'c.height=innerHeight'})
for(i in obj){
w.emit("msg",{script:'ctx.fillRect('+obj[i].x+','+obj[i].y+',32,32)'})
}},25)
})
setInterval(()=>{
for(i in obj){
obj[i].x+=obj[i].xs
obj[i].y+=obj[i].ys
}},25)
