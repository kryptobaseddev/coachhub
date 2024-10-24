<script>
  let batteryLevel = 75;
  let waterLevel = 60;
  let temperature = 22;
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4">System Status</h2>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium">Battery Level</h3>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-green-600 h-2.5 rounded-full" style="width: {batteryLevel}%"></div>
      </div>
      <p class="text-sm text-gray-600 mt-1">{batteryLevel}%</p>
    </div>
    <div>
      <h3 class="text-lg font-medium">Water Level</h3>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: {waterLevel}%"></div>
      </div>
      <p class="text-sm text-gray-600 mt-1">{waterLevel}%</p>
    </div>
    <div>
      <h3 class="text-lg font-medium">Temperature</h3>
      <p class="text-3xl font-bold">{temperature}°C</p>
    </div>
  </div>
</div>