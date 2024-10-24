<script>
  import { Home, Activity, Sliders, Map, Settings, LogOut } from 'lucide-svelte';
</script>

<aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
  <nav>
    <ul class="space-y-2">
      <li>
        <a href="/" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Home size={20} />
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/status" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Activity size={20} />
          <span>System Status</span>
        </a>
      </li>
      <li>
        <a href="/controls" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Sliders size={20} />
          <span>Controls</span>
        </a>
      </li>
      <li>
        <a href="/map" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Map size={20} />
          <span>Map</span>
        </a>
      </li>
      <li>
        <a href="/settings" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </li>
    </ul>
  </nav>
  <button class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded mt-auto">
    <LogOut size={20} />
    <span>Logout</span>
  </button>
</aside>