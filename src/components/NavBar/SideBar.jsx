import React from 'react'

const SideBar = () => {
  return (
    <div class="offcanvas offcanvas-start" tabindex="1" id="offcanvas" aria-labelledby="offcanvasLabel" data-bs-backdrop="false" data-bs-keyboard="false" style={{ position: 'fixed', top: '56px', bottom: '0', left: '0', zIndex: 1050 }}>
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
      </div>
    </div>
  )
}

export default SideBar
