<script>
    export let tile;
  </script>
  
  <style>
    .tile {
      display:flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      height: 1.5cm;
      width: 1.5cm;
    }
  </style>
  
  <div class="tile">
    {tile.name}
  </div>
  