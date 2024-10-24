<script>
  let lightOn = false;
  let temperature = 22;

  function toggleLight() {
    lightOn = !lightOn;
  }

  function adjustTemperature(change) {
    temperature += change;
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4">Controls</h2>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">Lighting</h3>
      <button on:click={toggleLight} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {lightOn ? 'Turn Off Lights' : 'Turn On Lights'}
      </button>
    </div>
    <div>
      <h3 class="text-lg font-medium mb-2">Temperature</h3>
      <div class="flex items-center space-x-4">
        <button on:click={() => adjustTemperature(-1)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          -
        </button>
        <span class="text-2xl font-bold">{temperature}°C</span>
        <button on:click={() => adjustTemperature(1)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          +
        </button>
      </div>
    </div>
  </div>
</div>