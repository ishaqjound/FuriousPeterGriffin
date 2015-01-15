<!doctype html>
<html lang='sv'>
<head>
<meta charset='utf-8' />
<title>Furious Peter Griffin</title>
<link href="style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class ='logo'>
<img src="img/logo.png" alt="Peter Griffin">
</div>
<div class="inforight"> 
<h3>How to play</h3>
<p>Använd piltangenterna för att flytta dig i banan. Peter har 30 sekunder på sig att äta upp antal kycklingar.</p>
<p>LYCKA TILL!</p>
</div>
<div class='container'>
<canvas id="mycanvas" width="900" height="500">Your browser doesn't support HTML5 canvas</canvas>
<audio id="bgmusic" loop>
  <source src="audio/bg.mp3" type="audio/mp3" />  
</audio>
<button class="music" onclick="pausemusic()" type="button">Music off</button>
<button class="music"  onclick="playmusic()" type="button">Music on</button>

<div id='button'>Play again</div>
</div>
<script src="jquery.js"></script>
<script src="main.js"></script>
</body>
</html>
