document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        dateDisplay: document.getElementById('current-date-display'),
        viewIndicator: document.getElementById('view-indicator'),
        navLinks: document.querySelectorAll('.nav-links li'),
        views: document.querySelectorAll('.planner-view'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        todayBtn: document.getElementById('today-btn'),
        exportBtn: document.getElementById('export-btn'),
        importBtn: document.getElementById('import-btn'),
        importInput: document.getElementById('import-input'),
        timelineContainer: document.getElementById('timeline-container'),
        yearView: document.getElementById('year-view'),
        monthView: document.getElementById('month-view'),
        weekView: document.getElementById('week-view'),
        dayView: document.getElementById('day-view'),
        upcomingPlansContainer: document.getElementById('upcoming-plans-container'),
        focusTasksList: document.getElementById('focus-tasks-list'),
        addTaskBtn: document.getElementById('add-task-btn'),
        syncBtn: document.getElementById('github-sync-btn'),
        settingsBtn: document.getElementById('github-settings-btn'),
        ghModal: document.getElementById('github-modal'),
        closeGhModal: document.getElementById('close-gh-modal'),
        saveGhSettings: document.getElementById('save-gh-settings'),
        ghUsername: document.getElementById('gh-username'),
        ghRepo: document.getElementById('gh-repo'),
        ghToken: document.getElementById('gh-token')
    };

    let ghConfig = {
        username: localStorage.getItem('gh_username') || '',
        repo: localStorage.getItem('gh_repo') || '',
        token: localStorage.getItem('gh_token') || ''
    };

    let currentDate = new Date();
    let currentView = 'day';

    // 2026 Korean Holidays (Verified)
    const HOLIDAYS_2026 = {
        '2026-01-01': '신정',
        '2026-02-16': '설날',
        '2026-02-17': '설날',
        '2026-02-18': '설날',
        '2026-03-01': '삼일절',
        '2026-03-02': '대체공휴일',
        '2026-05-05': '어린이날',
        '2026-05-24': '부처님오신날',
        '2026-05-25': '대체공휴일',
        '2026-06-03': '지방선거',
        '2026-06-06': '현충일',
        '2026-07-17': '제헌절',
        '2026-08-15': '광복절',
        '2026-08-17': '대체공휴일',
        '2026-09-23': '추석',
        '2026-09-24': '추석',
        '2026-09-25': '추석',
        '2026-10-03': '개천절',
        '2026-10-05': '대체공휴일',
        '2026-10-09': '한글날',
        '2026-12-25': '성탄절'
    };

    let plannerData = JSON.parse(localStorage.getItem('antigravity_planner_data')) || { day: {}, week: {}, month: {}, year: {}, focusTasks: [] };
    if (!plannerData.focusTasks) plannerData.focusTasks = [];

    const isHoliday = (date) => {
        const dateKey = getDateKey(date);
        return HOLIDAYS_2026[dateKey] || date.getDay() === 0;
    };

    const getHolidayName = (date) => {
        const dateKey = getDateKey(date);
        return HOLIDAYS_2026[dateKey] || (date.getDay() === 0 ? '일요일' : '');
    };

    const isSaturday = (date) => date.getDay() === 6;

    const init = () => {
        setupEventListeners();
        renderActiveView();
    };

    const saveData = () => localStorage.setItem('antigravity_planner_data', JSON.stringify(plannerData));

    const renderActiveView = () => {
        updateHeader();
        elements.views.forEach(v => v.classList.add('hidden'));
        document.getElementById(`${currentView}-view`).classList.remove('hidden');

        // Handle visibility of date pager
        const isFocusView = currentView === 'focus';
        elements.prevBtn.style.visibility = isFocusView ? 'hidden' : 'visible';
        elements.nextBtn.style.visibility = isFocusView ? 'hidden' : 'visible';
        elements.todayBtn.style.visibility = isFocusView ? 'hidden' : 'visible';

        if (currentView === 'day') renderDayView();
        else if (currentView === 'week') renderWeekView();
        else if (currentView === 'month') renderMonthView();
        else if (currentView === 'year') renderYearView();
        else if (currentView === 'focus') renderFocusView();
    };

    const updateHeader = () => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
        let displayStr = currentDate.toLocaleDateString('ko-KR', options);
        if (currentView === 'month') displayStr = currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
        else if (currentView === 'year') displayStr = currentDate.getFullYear();
        elements.dateDisplay.textContent = displayStr;
        if (currentView === 'focus') {
            elements.dateDisplay.textContent = 'Core Focus Tasks';
            elements.viewIndicator.textContent = 'Strategic Priorities';
        } else {
            elements.viewIndicator.textContent = `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} View`;
        }
    };

    const renderDayView = () => {
        const dateKey = getDateKey(currentDate);
        if (!plannerData.day[dateKey]) plannerData.day[dateKey] = { activities: {}, focus: {}, goals: '', reflectionGood: '', reflectionBetter: '' };
        const dayData = plannerData.day[dateKey];
        if (!dayData.activities) dayData.activities = {};
        if (!dayData.focus) dayData.focus = {};

        elements.timelineContainer.innerHTML = '';

        // Loop from 04:00 to 02:00 (next day) in 30-minute steps
        for (let h = 4; h <= 26; h++) {
            [0, 30].forEach(m => {
                if (h === 26 && m > 0) return; // Stop at 02:00
                const hDisplay = (h % 24).toString().padStart(2, '0');
                const mDisplay = m.toString().padStart(2, '0');
                const timeKey = `${hDisplay}:${mDisplay}`;
                const labelDisplay = m === 0 ? timeKey : `:${mDisplay}`;
                const hourData = dayData.activities[timeKey] || { plan: '', do: '' };

                const row = document.createElement('div');
                row.className = 'timeline-row';
                row.innerHTML = `
                    <div class="time-label">${labelDisplay}</div>
                    <input type="text" class="activity-input" data-time="${timeKey}" data-type="plan" placeholder="PLAN" value="${hourData.plan || ''}">
                    <input type="text" class="activity-input" data-time="${timeKey}" data-type="do" placeholder="DO" value="${hourData.do || ''}">
                `;
                elements.timelineContainer.appendChild(row);
            });
        }
        document.getElementById('reflection-better').value = dayData.reflectionBetter || '';

        // Render Upcoming Plans (D, D+1, D+2)
        renderUpcomingPlans();
    };

    const renderUpcomingPlans = () => {
        elements.upcomingPlansContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() + i);
            const dateKey = getDateKey(date);
            const content = plannerData.month[dateKey] || '';
            const isToday = i === 0;

            const options = { month: 'short', day: 'numeric', weekday: 'short' };
            const dateDisplay = date.toLocaleDateString('ko-KR', options);
            const hName = getHolidayName(date);

            const div = document.createElement('div');
            div.className = `upcoming-plan-item ${isToday ? 'today' : ''}`;
            div.innerHTML = `
                <div class="upcoming-plan-date">
                    <span>${dateDisplay} ${isToday ? '(Today)' : ''}</span>
                    ${hName ? `<span class="badge ${isSaturday(date) ? 'is-saturday' : (isHoliday(date) ? 'is-holiday' : '')}">${hName}</span>` : ''}
                </div>
                <div class="upcoming-plan-content">${content}</div>
            `;
            elements.upcomingPlansContainer.appendChild(div);
        }
    };

    const renderMonthView = () => {
        const y = currentDate.getFullYear(), m = currentDate.getMonth();
        const monthYearKey = `${y}-${(m + 1).toString().padStart(2, '0')}`;
        const yearlyGoal = plannerData.year[monthYearKey] || 'No yearly goal set for this month.';

        let html = `<div class="monthly-layout">
            <aside class="sidebar-context">
                <div class="context-sidebar">
                    <h3>Yearly Goal (Context)</h3>
                    <div class="context-text">${yearlyGoal}</div>
                </div>
                <div class="month-summary-card">
                    <h3>Monthly Plan/Summary</h3>
                    <textarea class="month-summary-input" data-month="${monthYearKey}">${plannerData.monthSummary?.[monthYearKey] || ''}</textarea>
                </div>
            </aside>
            <div class="calendar-grid">`;
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => html += `<div class="calendar-day header">${d}</div>`);
        const first = new Date(y, m, 1).getDay();
        const last = new Date(y, m + 1, 0).getDate();
        for (let i = 0; i < first; i++) html += '<div class="calendar-day muted"></div>';
        for (let d = 1; d <= last; d++) {
            const date = new Date(y, m, d);
            const dateKey = getDateKey(date);
            const classList = ['calendar-day'];
            const hName = getHolidayName(date);
            if (isHoliday(date)) classList.push('is-holiday');
            if (isSaturday(date)) classList.push('is-saturday');

            html += `<div class="${classList.join(' ')}">
                <strong>${d}${hName ? `<span class="holiday-name">${hName}</span>` : ''}</strong>
                <textarea class="calendar-input" data-date="${dateKey}">${plannerData.month[dateKey] || ''}</textarea>
            </div>`;
        }
        elements.monthView.innerHTML = html + '</div></div>';
    };

    const renderWeekView = () => {
        const y = currentDate.getFullYear(), m = currentDate.getMonth();
        const monthYearKey = `${y}-${(m + 1).toString().padStart(2, '0')}`;
        const monthlyPlan = plannerData.monthSummary?.[monthYearKey] || 'No monthly plan set.';

        let html = `<div class="weekly-view-layout">
            <aside class="sidebar-context">
                <div class="context-sidebar">
                    <h3>Monthly Plan (Context)</h3>
                    <div class="context-text">${monthlyPlan}</div>
                </div>
            </aside>
            <div class="weekly-layout">`;
        for (let i = 0; i < 7; i++) {
            const d = new Date(currentDate); d.setDate(d.getDate() - d.getDay() + i);
            const dateKey = getDateKey(d);
            const entry = plannerData.month[dateKey] || '';
            const badgeClass = ['badge'];
            const hName = getHolidayName(d);
            if (isHoliday(d)) badgeClass.push('is-holiday');
            if (isSaturday(d)) badgeClass.push('is-saturday');

            html += `<div class="weekly-day-col">
                <div class="${badgeClass.join(' ')}">
                    ${d.toLocaleDateString('ko-KR', { weekday: 'short', day: 'numeric' })}
                    ${hName ? `<span class="holiday-name">${hName}</span>` : ''}
                </div>
                <textarea class="week-input" data-date="${dateKey}">${entry}</textarea></div>`;
        }
        elements.weekView.innerHTML = html + '</div></div>';
    };

    const renderYearView = () => {
        const year = currentDate.getFullYear();
        let html = '<div class="year-grid">';
        for (let m = 0; m < 12; m++) {
            const dateKey = `${year}-${(m + 1).toString().padStart(2, '0')}`;
            html += `<div class="year-month-card"><h3>${new Date(year, m).toLocaleString('default', { month: 'long' })}</h3>
                <textarea class="year-input" data-month="${dateKey}">${plannerData.year[dateKey] || ''}</textarea></div>`;
        }
        elements.yearView.innerHTML = html + '</div>';
    };

    const renderFocusView = () => {
        elements.focusTasksList.innerHTML = '';
        if (plannerData.focusTasks.length === 0) {
            elements.focusTasksList.innerHTML = '<div class="empty-state">No focus tasks active. Click "+ Add New Task" to begin.</div>';
            return;
        }
        plannerData.focusTasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.className = 'focus-task-card';
            card.innerHTML = `
                <div class="task-header">
                    <input type="text" class="task-title-input" value="${task.title || ''}" placeholder="Enter Task Title..." data-index="${index}" data-field="title">
                </div>
                <div class="task-body">
                    <div class="task-meta">
                        <select class="priority-select" data-index="${index}" data-field="priority">
                            <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High Priority</option>
                            <option value="Medium" ${task.priority === 'Medium' || !task.priority ? 'selected' : ''}>Medium</option>
                            <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                        </select>
                        <select class="status-select" data-index="${index}" data-field="status">
                            <option value="Planned" ${task.status === 'Planned' || !task.status ? 'selected' : ''}>Planned</option>
                            <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                            <option value="On Hold" ${task.status === 'On Hold' ? 'selected' : ''}>On Hold</option>
                            <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        </select>
                    </div>
                    <textarea class="task-textarea" placeholder="Add details or progress updates..." data-index="${index}" data-field="notes">${task.notes || ''}</textarea>
                </div>
                <div class="task-footer">
                    <button class="btn-delete" data-index="${index}">Delete</button>
                    <span class="badge">Created: ${task.created || getDateKey(new Date())}</span>
                </div>
            `;
            elements.focusTasksList.appendChild(card);
        });
    };

    const setGHStatus = (status, text) => {
        elements.syncBtn.className = `btn-text ${status}`;
        elements.syncBtn.textContent = text;
        if (status === 'success' || status === 'error') {
            setTimeout(() => {
                elements.syncBtn.className = 'btn-text';
                elements.syncBtn.textContent = 'Sync';
            }, 3000);
        }
    };

    const fetchFromGitHub = async () => {
        const { username, repo, token } = ghConfig;
        if (!username || !repo || !token) return null;
        try {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data.json`, {
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
            });
            if (res.status === 404) return null;
            const fileData = await res.json();
            const content = decodeURIComponent(atob(fileData.content).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return { data: JSON.parse(content), sha: fileData.sha };
        } catch (e) { console.error(e); return null; }
    };

    const pushToGitHub = async (data, sha = null) => {
        const { username, repo, token } = ghConfig;
        try {
            const body = {
                message: `Update data ${new Date().toISOString()}`,
                content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
                sha: sha
            };
            const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data.json`, {
                method: 'PUT',
                headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            return res.ok;
        } catch (e) { console.error(e); return false; }
    };

    const syncWithGitHub = async () => {
        const { username, repo, token } = ghConfig;
        if (!username || !repo || !token) {
            elements.ghModal.classList.remove('hidden');
            return;
        }
        setGHStatus('syncing', 'Syncing...');
        const remote = await fetchFromGitHub();

        let dataToPush = plannerData;
        let remoteSha = null;

        if (remote) {
            remoteSha = remote.sha;
            plannerData = { ...plannerData, ...remote.data };
            saveData();
            renderActiveView();
            dataToPush = plannerData;
        }

        const success = await pushToGitHub(dataToPush, remoteSha);
        if (success) setGHStatus('success', 'Synced!');
        else setGHStatus('error', 'Sync Failed');
    };

    const getDateKey = (date) => {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const setupEventListeners = () => {
        elements.navLinks.forEach(link => link.addEventListener('click', () => {
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active'); currentView = link.dataset.view; renderActiveView();
        }));

        const changeDate = (offset) => {
            if (currentView === 'day') currentDate.setDate(currentDate.getDate() + offset);
            else if (currentView === 'week') currentDate.setDate(currentDate.getDate() + (offset * 7));
            else if (currentView === 'month') currentDate.setMonth(currentDate.getMonth() + offset);
            else if (currentView === 'year') currentDate.setFullYear(currentDate.getFullYear() + offset);
            renderActiveView();
        };

        elements.prevBtn.addEventListener('click', () => changeDate(-1));
        elements.nextBtn.addEventListener('click', () => changeDate(1));
        elements.todayBtn.addEventListener('click', () => { currentDate = new Date(); renderActiveView(); });

        document.addEventListener('input', (e) => {
            const t = e.target; const dk = getDateKey(currentDate);
            if (currentView === 'day') {
                if (!plannerData.day[dk]) plannerData.day[dk] = { activities: {}, focus: {} };
                const dayEntry = plannerData.day[dk];
                if (!dayEntry.activities) dayEntry.activities = {};
                if (!dayEntry.focus) dayEntry.focus = {};

                if (t.classList.contains('activity-input')) {
                    const time = t.dataset.time;
                    const type = t.dataset.type;
                    if (!dayEntry.activities[time]) dayEntry.activities[time] = { plan: '', do: '' };
                    dayEntry.activities[time][type] = t.value;
                }
                if (t.dataset.field) dayEntry[t.dataset.field] = t.value;
            } else if (currentView === 'month') {
                if (t.classList.contains('calendar-input')) plannerData.month[t.dataset.date] = t.value;
                if (t.classList.contains('month-summary-input')) {
                    if (!plannerData.monthSummary) plannerData.monthSummary = {};
                    plannerData.monthSummary[t.dataset.month] = t.value;
                }
            } else if (currentView === 'week' && t.classList.contains('week-input')) {
                plannerData.month[t.dataset.date] = t.value;
            } else if (currentView === 'year' && t.classList.contains('year-input')) {
                plannerData.year[t.dataset.month] = t.value;
            } else if (currentView === 'focus') {
                const index = t.dataset.index;
                const field = t.dataset.field;
                if (plannerData.focusTasks[index]) {
                    plannerData.focusTasks[index][field] = t.value;
                }
            }
            saveData();
        });

        if (elements.addTaskBtn) {
            elements.addTaskBtn.addEventListener('click', () => {
                plannerData.focusTasks.push({
                    title: '',
                    notes: '',
                    priority: 'Medium',
                    status: 'Planned',
                    created: getDateKey(new Date())
                });
                saveData();
                renderFocusView();
            });
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) {
                const index = e.target.dataset.index;
                if (confirm('Delete this task?')) {
                    plannerData.focusTasks.splice(index, 1);
                    saveData();
                    renderFocusView();
                }
            }
        });

        elements.exportBtn.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(plannerData, null, 2)], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = `planner_backup_${getDateKey(new Date())}.json`; a.click();
        });

        elements.importInput.addEventListener('change', (e) => {
            const f = e.target.files[0]; if (!f) return;
            const r = new FileReader(); r.onload = (ev) => {
                plannerData = JSON.parse(ev.target.result); saveData(); renderActiveView(); alert('Backup restored!');
            }; r.readAsText(f);
        });

        // GitHub Sync
        elements.syncBtn.addEventListener('click', syncWithGitHub);
        elements.settingsBtn.addEventListener('click', () => {
            elements.ghUsername.value = ghConfig.username;
            elements.ghRepo.value = ghConfig.repo;
            elements.ghToken.value = ghConfig.token;
            elements.ghModal.classList.remove('hidden');
        });

        elements.closeGhModal.addEventListener('click', () => elements.ghModal.classList.add('hidden'));

        elements.saveGhSettings.addEventListener('click', () => {
            ghConfig.username = elements.ghUsername.value.trim();
            ghConfig.repo = elements.ghRepo.value.trim();
            ghConfig.token = elements.ghToken.value.trim();
            localStorage.setItem('gh_username', ghConfig.username);
            localStorage.setItem('gh_repo', ghConfig.repo);
            localStorage.setItem('gh_token', ghConfig.token);
            elements.ghModal.classList.add('hidden');
            alert('GitHub settings saved!');
        });
    };

    init();
});
