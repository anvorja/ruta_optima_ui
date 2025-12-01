import L from 'leaflet'

// @ts-expect-error - Leaflet internal property workaround
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export const createVehicleIcon = (status: string) => {
    const colors = {
        active: '#10b981',
        available: '#3b82f6',
        maintenance: '#f59e0b',
        inactive: '#6b7280',
    }

    const color = colors[status as keyof typeof colors] || colors.inactive

    return L.divIcon({
        html: `
      <div style="position: relative;">
        <div style="
          width: 32px;
          height: 32px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M14 16l-4-4 4-4"></path>
          </svg>
        </div>
        ${status === 'active' ? '<div style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>' : ''}
      </div>
    `,
        className: 'custom-vehicle-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    })
}