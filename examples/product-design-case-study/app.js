// Apex Academic Registration Workbench - Interactive Controller
document.addEventListener('DOMContentLoaded', () => {
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const btnResolve = document.getElementById('btnResolve');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const btnCancelDrawer = document.getElementById('btnCancelDrawer');
  const btnApplySwap = document.getElementById('btnApplySwap');
  const blockCS402 = document.getElementById('blockCS402');
  const blockMATH320 = document.getElementById('blockMATH320');
  const slotTue11 = document.getElementById('slotTue11');
  const slotThu11 = document.getElementById('slotThu11');
  const slotTue16 = document.getElementById('slotTue16');
  const slotThu16 = document.getElementById('slotThu16');
  const cardCS402 = document.getElementById('cardCS402');
  const statusIndicator = document.getElementById('statusIndicator');
  const btnCommit = document.getElementById('btnCommit');
  const toastContainer = document.getElementById('toastContainer');

  let isResolved = false;

  function openDrawer() {
    drawerBackdrop.classList.add('open');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10B981' : '#6366F1'}" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Drawer Triggers
  btnResolve?.addEventListener('click', openDrawer);
  blockCS402?.addEventListener('click', openDrawer);
  btnCloseDrawer?.addEventListener('click', closeDrawer);
  btnCancelDrawer?.addEventListener('click', closeDrawer);

  drawerBackdrop?.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) closeDrawer();
  });

  // Apply Section Swap
  btnApplySwap?.addEventListener('click', () => {
    isResolved = true;
    closeDrawer();

    // Move CS402 to Tue/Thu 16:00
    slotTue11.innerHTML = '';
    
    // Create new clean block in Tue 16:00
    slotTue16.innerHTML = `
      <div class="class-block" data-code="CS402">
        <span class="class-code">CS402 (Sec B)</span>
        <span class="class-name">Distributed Systems</span>
        <span class="class-room">Hopper 104</span>
      </div>
    `;

    // Clean MATH320 conflict state
    blockMATH320.classList.remove('conflict');
    blockMATH320.querySelector('.class-code').textContent = 'MATH320';

    // Update Sidebar Card
    cardCS402.classList.remove('active-conflict');
    cardCS402.querySelector('.course-badge').className = 'course-badge badge-core';
    cardCS402.querySelector('.course-badge').textContent = 'Section B';
    cardCS402.querySelector('.course-schedule').innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Tue/Thu 16:00 - 17:30 (Hopper 104)
    `;
    cardCS402.querySelector('.conflict-alert-box').style.display = 'none';

    // Update Top Status Bar
    statusIndicator.style.color = 'var(--semantic-success)';
    statusIndicator.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
      Schedule Valid (0 Conflicts)
    `;

    showToast('Swapped to CS402 Section B. Conflict resolved!');
  });

  // Commit Registration (Optimistic UI)
  btnCommit?.addEventListener('click', () => {
    if (!isResolved) {
      alert('Please resolve the schedule conflict for CS402 before committing registration.');
      openDrawer();
      return;
    }

    btnCommit.disabled = true;
    btnCommit.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
      Securing Seats...
    `;

    setTimeout(() => {
      btnCommit.className = 'btn btn-secondary';
      btnCommit.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
        Enrolled (Fall 2026)
      `;
      showToast('🎉 Successfully registered for 4 courses (16.0 Credits)!', 'success');
    }, 900);
  });
});
