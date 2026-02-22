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
        settingsView: document.getElementById('settings-view'),
        ghUsernameInput: document.getElementById('settings-gh-username'),
        ghRepoInput: document.getElementById('settings-gh-repo'),
        ghTokenInput: document.getElementById('settings-gh-token'),
        saveGhSettingsBtn: document.getElementById('save-settings-gh'),
        holidayManagerContainer: document.getElementById('holiday-manager-container'),
        addHolidayBtn: document.getElementById('add-holiday-btn'),
        headerDateDisplay: document.getElementById('current-date-display'),
        headerDateJump: document.getElementById('header-date-jump'),
        holidayEditorModal: document.getElementById('holiday-editor-modal'),
        holidayModalName: document.getElementById('holiday-modal-name'),
        holidayModalRecurring: document.getElementById('holiday-modal-recurring'),
        holidayModalSpecificContainer: document.getElementById('holiday-modal-specific-container'),
        holidayModalRecurringContainer: document.getElementById('holiday-modal-recurring-container'),
        holidayModalDate: document.getElementById('holiday-modal-date'),
        holidayModalRecurringDate: document.getElementById('holiday-modal-recurring-date'),
        saveHolidayModalBtn: document.getElementById('save-holiday-modal'),
        closeHolidayModalBtn: document.getElementById('close-holiday-modal'),
        dayEditorModal: document.getElementById('day-editor-modal'),
        modalDateTitle: document.getElementById('modal-date-title'),
        modalDayInput: document.getElementById('modal-day-input'),
        saveDayBtn: document.getElementById('save-day-btn'),
        closeDayModal: document.getElementById('close-day-modal'),
        monthEditorModal: document.getElementById('month-editor-modal'),
        modalMonthTitle: document.getElementById('modal-month-title'),
        modalMonthInput: document.getElementById('modal-month-input'),
        saveMonthBtn: document.getElementById('save-month-btn'),
        closeMonthModal: document.getElementById('close-month-modal')
    };

    let currentDate = new Date();
    let currentView = 'day';
    let selectedDateKey = '';
    let selectedMonthKey = '';

    // Korean Holidays (2026-2040) - Verified Solar, Lunar, and Substitute Holidays
    const HOLIDAYS = {
        // Solar Fixed Holidays
        'solar': { '01-01': '신정', '03-01': '삼일절', '05-05': '어린이날', '06-06': '현충일', '07-17': '제헌절', '08-15': '광복절', '10-03': '개천절', '10-09': '한글날', '12-25': '성탄절' },
        // Lunar & Substitute Holidays (Lookup)
        'lunar_and_sub': {
            '2026-02-16': '설날', '2026-02-17': '설날', '2026-02-18': '설날', '2026-03-02': '대체공휴일(삼일절)', '2026-05-25': '대체공휴일(석가탄신일)', '2026-08-17': '대체공휴일(광복절)', '2026-09-24': '추석', '2026-09-25': '추석', '2026-09-26': '추석', '2026-10-05': '대체공휴일(개천절)',
            '2027-02-06': '설날', '2027-02-07': '설날', '2027-02-08': '설날', '2027-02-09': '대체공휴일(설날)', '2027-05-13': '석가탄신일', '2027-08-16': '대체공휴일(광복절)', '2027-09-14': '추석', '2027-09-15': '추석', '2027-09-16': '추석', '2027-10-04': '대체공휴일(개천절)', '2027-10-11': '대체공휴일(한글날)',
            '2028-01-26': '설날', '2028-01-27': '설날', '2028-01-28': '설날', '2028-01-29': '대체공휴일(설날)', '2028-05-02': '석가탄신일', '2028-10-02': '추석', '2028-10-03': '추석', '2028-10-04': '추석',
            '2029-02-12': '설날', '2029-02-13': '설날', '2029-02-14': '설날', '2029-05-07': '대체공휴일(어린이날)', '2029-05-20': '석가탄신일', '2029-05-21': '대체공휴일(석가탄신일)', '2029-09-21': '추석', '2029-09-22': '추석', '2029-09-23': '추석', '2029-09-24': '대체공휴일(추석)',
            '2030-02-02': '설날', '2030-02-03': '설날', '2030-02-04': '설날', '2030-02-05': '대체공휴일(설날)', '2030-05-06': '대체공휴일(어린이날)', '2030-05-09': '석가탄신일', '2030-09-11': '추석', '2030-09-12': '추석', '2030-09-13': '추석',
            '2031-01-22': '설날', '2031-01-23': '설날', '2031-01-24': '설날', '2031-01-25': '대체공휴일(설날)', '2031-03-03': '대체공휴일(삼일절)', '2031-05-28': '석가탄신일', '2031-09-30': '추석', '2031-10-01': '추석', '2031-10-02': '추석',
            '2032-02-10': '설날', '2032-02-11': '설날', '2032-02-12': '설날', '2032-05-16': '석가탄신일', '2032-05-17': '대체공휴일(석가탄신일)', '2032-06-07': '대체공휴일(현충일)', '2032-07-19': '대체공휴일(제헌절)', '2032-08-16': '대체공휴일(광복절)', '2032-09-18': '추석', '2032-09-19': '추석', '2032-09-20': '추석', '2032-09-21': '대체공휴일(추석)', '2032-10-04': '대체공휴일(개천절)', '2032-10-11': '대체공휴일(한글날)', '2032-12-27': '대체공휴일(성탄절)',
            '2033-01-03': '대체공휴일(신정)', '2033-01-30': '설날', '2033-01-31': '설날', '2033-02-01': '설날', '2033-05-25': '석가탄신일', '2033-07-18': '대체공휴일(제헌절)', '2033-09-07': '추석', '2033-09-08': '추석', '2033-09-09': '추석', '2033-10-10': '대체공휴일(한글날)', '2033-12-26': '대체공휴일(성탄절)',
            '2034-01-02': '대체공휴일(신정)', '2034-02-18': '설날', '2034-02-19': '설날', '2034-02-20': '설날', '2034-05-25': '석가탄신일', '2034-09-26': '추석', '2034-09-27': '추석', '2034-09-28': '추석',
            '2035-02-07': '설날', '2035-02-08': '설날', '2035-02-09': '설날', '2035-02-10': '대체공휴일(설날)', '2035-03-03': '대체공휴일(삼일절)', '2035-05-14': '석가탄신일', '2035-09-15': '추석', '2035-09-16': '추석', '2035-09-17': '추석', '2035-09-18': '대체공휴일(추석)',
            '2036-01-27': '설날', '2036-01-28': '설날', '2036-01-29': '설날', '2036-03-03': '대체공휴일(삼일절)', '2036-05-03': '석가탄신일', '2036-05-06': '대체공휴일(석가탄신일/어린이날)', '2036-10-05': '추석', '2036-10-06': '추석', '2036-10-07': '추석',
            '2037-02-14': '설날', '2037-02-15': '설날', '2037-02-16': '설날', '2037-03-02': '대체공휴일(삼일절)', '2037-05-23': '석가탄신일', '2037-05-25': '대체공휴일(석가탄신일)', '2037-06-08': '대체공휴일(현충일)', '2037-08-17': '대체공휴일(광복절)', '2037-09-23': '추석', '2037-09-24': '추석', '2037-09-25': '추석', '2037-10-05': '대체공휴일(개천절)',
            '2038-02-03': '설날', '2038-02-04': '설날', '2038-02-05': '설날', '2038-05-13': '석가탄신일', '2038-06-07': '대체공휴일(현충일)', '2038-07-19': '대체공휴일(제헌절)', '2038-08-16': '대체공휴일(광복절)', '2038-09-12': '추석', '2038-09-13': '추석', '2038-09-14': '추석', '2038-10-04': '대체공휴일(개천절)', '2038-10-11': '대체공휴일(한글날)', '2038-12-27': '대체공휴일(성탄절)',
            '2039-01-03': '대체공휴일(신정)', '2039-01-24': '설날', '2039-01-25': '설날', '2039-01-26': '설날', '2039-05-02': '석가탄신일', '2039-07-18': '대체공휴일(제헌절)', '2039-10-01': '추석', '2039-10-02': '추석', '2039-10-03': '추석', '2039-10-04': '대체공휴일(개천절)', '2039-10-10': '대체공휴일(한글날)', '2039-12-26': '대체공휴일(성탄절)',
            '2040-02-11': '설날', '2040-02-12': '설날', '2040-02-13': '설날', '2040-02-14': '대체공휴일(설날)', '2040-05-06': '대체공휴일(어린이날)', '2040-05-18': '석가탄신일', '2040-05-20': '대체공휴일(석가탄신일)', '2040-09-20': '추석', '2040-09-21': '추석', '2040-09-22': '추석', '2040-09-23': '대체공휴일(추석)'
        }
    };

    let plannerData = JSON.parse(localStorage.getItem('antigravity_planner_data')) || { day: {}, week: {}, month: {}, year: {}, focusTasks: [], archivedTasks: [], assignees: [], settings: null };

    // Initialize/Migrate Settings
    if (!plannerData.settings) {
        plannerData.settings = {
            github: {
                username: localStorage.getItem('gh_username') || '',
                repo: localStorage.getItem('gh_repo') || '',
                token: localStorage.getItem('gh_token') || ''
            },
            holidays: {}
        };
        // Merge hardcoded holidays into settings
        Object.entries(HOLIDAYS.solar).forEach(([k, v]) => plannerData.settings.holidays[k] = v);
        Object.entries(HOLIDAYS.lunar_and_sub).forEach(([k, v]) => plannerData.settings.holidays[k] = v);
    }


    if (!plannerData.archivedTasks) plannerData.archivedTasks = [];
    if (!plannerData.assignees) plannerData.assignees = [];

    // Data Migration for Focus Tasks (convert legacy strings to objects)
    if (plannerData.focusTasks) {
        plannerData.focusTasks = plannerData.focusTasks.map(task => {
            if (typeof task === 'string') return { title: task, subTasks: [] };
            if (!task.subTasks) task.subTasks = [];
            return task;
        });
    }

    const isHoliday = (date) => {
        const dateKey = getDateKey(date);
        const mdKey = dateKey.substring(5); // MM-DD
        return plannerData.settings.holidays[mdKey] || plannerData.settings.holidays[dateKey] || date.getDay() === 0;
    };

    const getHolidayName = (date) => {
        const dateKey = getDateKey(date);
        const mdKey = dateKey.substring(5); // MM-DD
        return plannerData.settings.holidays[mdKey] || plannerData.settings.holidays[dateKey] || (date.getDay() === 0 ? '일요일' : '');
    };

    const isSaturday = (date) => date.getDay() === 6;

    const init = () => {
        setupEventListeners();
        syncFocusTasksToCalendar();
        renderActiveView();
    };

    const saveData = () => localStorage.setItem('antigravity_planner_data', JSON.stringify(plannerData));

    const renderActiveView = () => {
        updateHeader();
        elements.views.forEach(v => v.classList.add('hidden'));
        document.getElementById(`${currentView}-view`).classList.remove('hidden');

        // Handle visibility of date pager
        const isFocusView = currentView === 'focus';
        const isSettingsView = currentView === 'settings';
        const hidePager = isFocusView || isSettingsView;
        elements.prevBtn.style.visibility = hidePager ? 'hidden' : 'visible';
        elements.nextBtn.style.visibility = hidePager ? 'hidden' : 'visible';
        elements.todayBtn.style.visibility = hidePager ? 'hidden' : 'visible';

        if (currentView === 'day') renderDayView();
        else if (currentView === 'week') renderWeekView();
        else if (currentView === 'month') renderMonthView();
        else if (currentView === 'year') renderYearView();
        else if (currentView === 'focus') renderFocusView();
        else if (currentView === 'settings') renderSettingsView();
    };

    const parseCellContent = (dateKey) => {
        const syncMarker = "[[FOCUS_SYNC_START]]";
        const content = plannerData.month[dateKey] || "";
        const markerIndex = content.indexOf(syncMarker);

        const userContent = markerIndex !== -1 ? content.substring(0, markerIndex).trim() : content.trim();
        let syncedItems = [];
        if (markerIndex !== -1) {
            try {
                const jsonStr = content.substring(markerIndex + syncMarker.length).trim();
                syncedItems = JSON.parse(jsonStr);
            } catch (e) { console.error("Sync parse error", e); }
        }
        return { userContent, syncedItems };
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
            const { userContent, syncedItems } = parseCellContent(dateKey);
            const classList = ['calendar-day'];
            const hName = getHolidayName(date);
            if (isHoliday(date)) classList.push('is-holiday');
            if (isSaturday(date)) classList.push('is-saturday');

            const syncHtml = syncedItems.map(item => `
                <div class="sync-item" data-jump-task-id="${item.id}">
                    🚩 <span class="sync-item-type">${item.type.toUpperCase()}</span> ${item.title}
                </div>
            `).join('');

            html += `<div class="${classList.join(' ')} clickable-day" data-date="${dateKey}">
                <strong>${d}${hName ? `<span class="holiday-name">${hName}</span>` : ''}</strong>
                <div class="calendar-day-content">${userContent}</div>
                <div class="sync-list">${syncHtml}</div>
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
            const { userContent, syncedItems } = parseCellContent(dateKey);
            const badgeClass = ['badge'];
            const hName = getHolidayName(d);
            if (isHoliday(d)) badgeClass.push('is-holiday');
            if (isSaturday(d)) badgeClass.push('is-saturday');

            const syncHtml = syncedItems.map(item => `
                <div class="sync-item" data-jump-task-id="${item.id}">
                    🚩 <span class="sync-item-type">${item.type.toUpperCase()}</span> ${item.title}
                </div>
            `).join('');

            html += `<div class="weekly-day-col">
                <div class="${badgeClass.join(' ')}">
                    ${d.toLocaleDateString('ko-KR', { weekday: 'short', day: 'numeric' })}
                    ${hName ? `<span class="holiday-name">${hName}</span>` : ''}
                </div>
                <textarea class="week-input" data-date="${dateKey}">${userContent}</textarea>
                <div class="sync-list">${syncHtml}</div>
            </div>`;
        }
        elements.weekView.innerHTML = html + '</div></div>';
    };

    const renderYearView = () => {
        const year = currentDate.getFullYear();
        let html = '<div class="year-grid">';
        for (let m = 0; m < 12; m++) {
            const dateKey = `${year}-${(m + 1).toString().padStart(2, '0')}`;
            const content = plannerData.year[dateKey] || '';
            html += `<div class="year-month-card clickable-month" data-month="${dateKey}">
                <h3>${new Date(year, m).toLocaleString('default', { month: 'long' })}</h3>
                <div class="year-month-content">${content}</div>
            </div>`;
        }
        elements.yearView.innerHTML = html + '</div>';
    };

    const renderSettingsView = () => {
        // GitHub Config
        elements.ghUsernameInput.value = plannerData.settings.github.username;
        elements.ghRepoInput.value = plannerData.settings.github.repo;
        elements.ghTokenInput.value = plannerData.settings.github.token;

        // Holiday Manager
        let html = '';
        const sortedKeys = Object.keys(plannerData.settings.holidays).sort((a, b) => {
            // Solar MM-DD keys first, then YYYY-MM-DD
            if (a.length !== b.length) return b.length - a.length; // Specific dates first
            return a.localeCompare(b);
        });

        sortedKeys.forEach(key => {
            const isRecurring = key.length === 5;
            html += `
                <div class="holiday-item" data-key="${key}">
                    <input type="${isRecurring ? 'text' : 'date'}" class="holiday-date-input" value="${isRecurring ? '매년 ' + key : key}" readonly>
                    <input type="text" class="holiday-name-input" value="${plannerData.settings.holidays[key]}" placeholder="Holiday Name">
                    <button class="btn-delete-holiday" title="Delete holiday">×</button>
                </div>
            `;
        });
        elements.holidayManagerContainer.innerHTML = html || '<p style="text-align:center; color:var(--text-secondary);">No holidays defined.</p>';
    };

    const renderFocusView = () => {
        elements.focusTasksList.innerHTML = '';

        // Add datalist for assignees once
        let datalist = document.getElementById('assignees-list');
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'assignees-list';
            document.body.appendChild(datalist);
        }
        datalist.innerHTML = (plannerData.assignees || []).map(a => `<option value="${a}">`).join('');

        const renderTaskCard = (task, taskIndex, isArchived = false) => {
            // Calculate progress
            let totalTodos = 0;
            let completedTodos = 0;
            (task.subTasks || []).forEach(sub => {
                (sub.todos || []).forEach(todo => {
                    totalTodos++;
                    if (todo.done) completedTodos++;
                });
            });
            const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

            const taskEl = document.createElement('div');
            taskEl.className = `focus-task-card task-level ${isArchived ? 'archived' : ''}`;
            taskEl.innerHTML = `
                <div class="task-progress-container">
                    <div class="task-progress-bar" style="width: ${progress}%"></div>
                </div>
                <div class="task-header">
                    <div class="header-main-row">
                        <input type="text" class="task-title-input" value="${task.title || ''}" placeholder="Main Task Title..." data-task-id="${taskIndex}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        <div class="header-btns">
                            <span class="progress-badge">${progress}%</span>
                            ${isArchived ? `
                                <button class="btn-restore-task" data-task-id="${taskIndex}" title="Restore Task">↺</button>
                            ` : `
                                <button class="btn-sub-add" data-task-id="${taskIndex}" title="Add Sub-Task">+ Sub</button>
                                <button class="btn-complete-task" data-task-id="${taskIndex}" title="Complete & Archive">✔</button>
                            `}
                            <button class="btn-delete-task" data-task-id="${taskIndex}" data-is-archived="${isArchived}" title="Delete Task">×</button>
                        </div>
                    </div>
                    <div class="meta-row main-meta">
                        <div class="meta-item">
                            <label>📅 Due</label>
                            <input type="date" class="meta-input" value="${task.dueDate || ''}" data-task-id="${taskIndex}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        </div>
                        <div class="meta-item">
                            <label>👤 Owner</label>
                            <input type="text" class="meta-input" value="${task.owner || ''}" placeholder="Assignee" data-task-id="${taskIndex}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        </div>
                    </div>
                </div>
                <div class="sub-tasks-container">
                    ${(task.subTasks || []).map((sub, subIndex) => {
                if (!sub.todos) sub.todos = [];
                return `
                        <div class="sub-task-item">
                            <div class="sub-header-container">
                                <div class="sub-header">
                                    <input type="text" class="sub-title-input" value="${sub.title || ''}" placeholder="Sub-Task Title..." data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                    ${!isArchived ? `
                                    <div class="header-btns">
                                        <button class="btn-todo-add" data-task-id="${taskIndex}" data-sub-id="${subIndex}">+ Todo</button>
                                        <button class="btn-delete-sub" data-task-id="${taskIndex}" data-sub-id="${subIndex}">×</button>
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="meta-row sub-meta">
                                    <div class="meta-item">
                                        <label>📅</label>
                                        <input type="date" class="meta-input" value="${sub.dueDate || ''}" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                    </div>
                                    <div class="meta-item">
                                        <label>👤</label>
                                        <input type="text" class="meta-input" value="${sub.owner || ''}" placeholder="Assignee" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                    </div>
                                </div>
                            </div>
                            <div class="todos-container">
                                ${sub.todos.map((todo, todoIndex) => `
                                    <div class="todo-item">
                                        <div class="todo-main-row">
                                            <input type="checkbox" class="todo-check" ${todo.done ? 'checked' : ''} data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-todo-id="${todoIndex}" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                            <input type="text" class="todo-title-input" value="${todo.title || ''}" placeholder="What needs to be done?" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-todo-id="${todoIndex}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                            ${!isArchived ? `<button class="btn-delete-todo" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-todo-id="${todoIndex}">×</button>` : ''}
                                        </div>
                                        <div class="meta-row todo-meta">
                                            <div class="meta-item">
                                                <label>📅</label>
                                                <input type="date" class="meta-input" value="${todo.dueDate || ''}" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-todo-id="${todoIndex}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                            </div>
                                            <div class="meta-item">
                                                <label>👤</label>
                                                <input type="text" class="meta-input" value="${todo.owner || ''}" placeholder="Owner" data-task-id="${taskIndex}" data-sub-id="${subIndex}" data-todo-id="${todoIndex}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `}).join('')}
                </div>
            `;
            return taskEl;
        };

        if (plannerData.focusTasks.length === 0 && plannerData.archivedTasks.length === 0) {
            elements.focusTasksList.innerHTML = '<div class="empty-state">No focus tasks active. Click "+ Add New Task" to begin.</div>';
            return;
        }

        // Render Active Tasks
        plannerData.focusTasks.forEach((task, taskIndex) => {
            elements.focusTasksList.appendChild(renderTaskCard(task, taskIndex, false));
        });

        // Render Archive Section if any
        if (plannerData.archivedTasks.length > 0) {
            const archiveHeader = document.createElement('div');
            archiveHeader.className = 'archive-header';
            archiveHeader.innerHTML = `<h3>Archive (Completed Tasks)</h3><div class="archive-divider"></div>`;
            elements.focusTasksList.appendChild(archiveHeader);

            plannerData.archivedTasks.forEach((task, taskIndex) => {
                elements.focusTasksList.appendChild(renderTaskCard(task, taskIndex, true));
            });
        }
    };

    const setGHStatus = (status, text, errorMsg = null) => {
        elements.syncBtn.className = `btn-text ${status}`;
        elements.syncBtn.textContent = text;
        if (status === 'error' && errorMsg) {
            alert(`Sync Error: ${errorMsg}`);
        }
        if (status === 'success' || status === 'error') {
            setTimeout(() => {
                elements.syncBtn.className = 'btn-text';
                elements.syncBtn.textContent = 'Sync';
            }, 3000);
        }
    };

    const fetchFromGitHub = async () => {
        const { username, repo, token } = plannerData.settings.github;
        if (!username || !repo || !token) return { error: "Missing configuration" };
        try {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data.json`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' }
            });
            if (res.status === 404) return { data: null, sha: null, message: `Repository or file "data.json" not found. Please check if "repo" is set to "${repo}" and if the repository exists under the user "${username}".` };
            if (!res.ok) return { error: `Fetch failed (${res.status})` };
            const fileData = await res.json();
            const content = decodeURIComponent(atob(fileData.content).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return { data: JSON.parse(content), sha: fileData.sha };
        } catch (e) { console.error(e); return { error: e.message }; }
    };

    const mergePlannerData = (local, remote) => {
        // Create a deep copy of local to protect settings
        const merged = JSON.parse(JSON.stringify(local));

        // Preserve local GitHub settings entirely
        const localGitHub = { ...((local.settings && local.settings.github) || {}) };

        for (const key in remote) {
            if (key === 'settings') {
                // Merge other settings but keep local github
                merged.settings = { ...(local.settings || {}), ...remote.settings };
                merged.settings.github = localGitHub;
            } else if (remote[key] && typeof remote[key] === 'object' && !Array.isArray(remote[key])) {
                merged[key] = { ...(local[key] || {}), ...remote[key] };
            } else {
                merged[key] = remote[key];
            }
        }
        return merged;
    };

    const pushToGitHub = async (data, sha = null) => {
        const { username, repo, token } = plannerData.settings.github;
        try {
            // DETACH sensitive settings before pushing
            const sanitizedData = JSON.parse(JSON.stringify(data));
            if (sanitizedData.settings && sanitizedData.settings.github) {
                sanitizedData.settings.github = { username: '', repo: '', token: '' };
            }

            const body = {
                message: `Update data ${new Date().toISOString()}`,
                content: btoa(unescape(encodeURIComponent(JSON.stringify(sanitizedData, null, 2)))),
                sha: sha
            };
            const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data.json`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                return { success: false, error: err.message || `Push failed (${res.status})` };
            }
            return { success: true };
        } catch (e) { console.error(e); return { success: false, error: e.message }; }
    };

    const syncWithGitHub = async () => {
        const { username, repo, token } = plannerData.settings.github;
        if (!username || !repo || !token) {
            alert("Please configure GitHub settings first.");
            currentView = 'settings';
            elements.navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === 'settings'));
            renderActiveView();
            return;
        }
        setGHStatus('syncing', 'Syncing...');

        try {
            const remoteResult = await fetchFromGitHub();
            if (remoteResult.error) {
                setGHStatus('error', 'Sync Failed', remoteResult.error + (remoteResult.message ? "\n\n" + remoteResult.message : ""));
                return;
            }

            let dataToPush = plannerData;
            let remoteSha = null;

            if (remoteResult.data) {
                remoteSha = remoteResult.sha;
                plannerData = mergePlannerData(plannerData, remoteResult.data);
                saveData();
                renderActiveView();
                dataToPush = plannerData;
            }

            const pushResult = await pushToGitHub(dataToPush, remoteSha);
            if (pushResult.success) {
                setGHStatus('success', 'Synced!');
            } else {
                setGHStatus('error', 'Sync Failed', pushResult.error + (pushResult.error.includes('404') ? "\n\nHint: Double check if your repository name in Settings is correct." : ""));
            }
        } catch (err) {
            console.error("Sync Error:", err);
            setGHStatus('error', 'Sync Failed', err.message);
        }
    };

    const getDateKey = (date) => {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const syncFocusTasksToCalendar = () => {
        const syncMarker = "[[FOCUS_SYNC_START]]";
        const entriesByDate = {};

        // Collect all active focus task items with due dates
        plannerData.focusTasks.forEach((task, idx) => {
            if (task.dueDate) {
                if (!entriesByDate[task.dueDate]) entriesByDate[task.dueDate] = [];
                entriesByDate[task.dueDate].push({ id: idx, type: 'task', title: task.title || 'Untitled' });
            }
            (task.subTasks || []).forEach(sub => {
                if (sub.dueDate) {
                    if (!entriesByDate[sub.dueDate]) entriesByDate[sub.dueDate] = [];
                    entriesByDate[sub.dueDate].push({ id: idx, type: 'sub', title: sub.title || 'Untitled' });
                }
                (sub.todos || []).forEach(todo => {
                    if (todo.dueDate) {
                        if (!entriesByDate[todo.dueDate]) entriesByDate[todo.dueDate] = [];
                        entriesByDate[todo.dueDate].push({ id: idx, type: 'todo', title: todo.title || 'Untitled' });
                    }
                });
            });
        });

        // Update plannerData.month for all affected (and previously affected) dates
        const allDates = new Set([...Object.keys(entriesByDate), ...Object.keys(plannerData.month)]);

        allDates.forEach(dateKey => {
            let content = plannerData.month[dateKey] || "";
            const markerIndex = content.indexOf(syncMarker);
            let userContent = markerIndex !== -1 ? content.substring(0, markerIndex).trim() : content.trim();

            const taskList = entriesByDate[dateKey] || [];
            if (taskList.length > 0) {
                const syncBlock = "\n" + syncMarker + "\n" + JSON.stringify(taskList);
                plannerData.month[dateKey] = (userContent + syncBlock).trim();
            } else if (markerIndex !== -1) {
                // If marker exists but no tasks for this date, remove it
                plannerData.month[dateKey] = userContent;
            }
        });
    };

    const setupEventListeners = () => {
        elements.navLinks.forEach(link => link.addEventListener('click', () => {
            elements.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active'); currentView = link.dataset.view;
            renderActiveView();
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
                if (t.classList.contains('calendar-input')) {
                    const { userContent, syncedItems } = parseCellContent(t.dataset.date);
                    const syncMarker = "[[FOCUS_SYNC_START]]";
                    const newContent = t.value + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
                    plannerData.month[t.dataset.date] = newContent.trim();
                }
                if (t.classList.contains('month-summary-input')) {
                    if (!plannerData.monthSummary) plannerData.monthSummary = {};
                    plannerData.monthSummary[t.dataset.month] = t.value;
                }
            } else if (currentView === 'week' && t.classList.contains('week-input')) {
                const { userContent, syncedItems } = parseCellContent(t.dataset.date);
                const syncMarker = "[[FOCUS_SYNC_START]]";
                const newContent = t.value + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
                plannerData.month[t.dataset.date] = newContent.trim();
            } else if (currentView === 'year' && t.classList.contains('year-input')) {
                plannerData.year[t.dataset.month] = t.value;
            } else if (currentView === 'focus') {
                const { taskId, subId, todoId, field, isArchived } = t.dataset;
                if (taskId !== undefined) {
                    const taskList = isArchived === 'true' ? plannerData.archivedTasks : plannerData.focusTasks;
                    const task = taskList[taskId];
                    if (todoId !== undefined) {
                        const todo = task.subTasks[subId].todos[todoId];
                        if (t.type === 'checkbox') todo.done = t.checked;
                        else todo[field] = t.value;
                    } else if (subId !== undefined) {
                        task.subTasks[subId][field] = t.value;
                    } else {
                        task[field] = t.value;
                    }

                    // Auto-save assignee to common list
                    if (field === 'owner' && t.value.trim().length > 0) {
                        if (!plannerData.assignees) plannerData.assignees = [];
                        if (!plannerData.assignees.includes(t.value.trim())) {
                            plannerData.assignees.push(t.value.trim());
                        }
                    }

                    // Sync to calendar if dueDate or title changed
                    if (field === 'dueDate' || field === 'title') {
                        syncFocusTasksToCalendar();
                    }
                }
            }
            saveData();
            if (currentView === 'focus' && e.target.type === 'checkbox') renderFocusView();
        });

        if (elements.addTaskBtn) {
            elements.addTaskBtn.addEventListener('click', () => {
                plannerData.focusTasks.push({
                    title: '',
                    subTasks: [],
                    created: getDateKey(new Date())
                });
                saveData();
                renderFocusView();
                // Focus newly added task
                const inputs = elements.focusTasksList.querySelectorAll('.task-title-input');
                inputs[inputs.length - 1].focus();
            });
        }

        document.addEventListener('click', (e) => {
            const t = e.target;
            const { taskId, subId, todoId, isArchived } = t.dataset;
            const taskList = isArchived === 'true' ? plannerData.archivedTasks : plannerData.focusTasks;

            if (t.classList.contains('btn-delete-task')) {
                if (confirm('Delete this task permanently?')) {
                    taskList.splice(taskId, 1);
                    syncFocusTasksToCalendar();
                    saveData(); renderFocusView();
                }
            } else if (t.classList.contains('btn-complete-task')) {
                const [task] = plannerData.focusTasks.splice(taskId, 1);
                plannerData.archivedTasks.unshift(task);
                syncFocusTasksToCalendar();
                saveData(); renderFocusView();
            } else if (t.classList.contains('btn-restore-task')) {
                const [task] = plannerData.archivedTasks.splice(taskId, 1);
                plannerData.focusTasks.push(task);
                syncFocusTasksToCalendar();
                saveData(); renderFocusView();
            } else if (t.classList.contains('btn-sub-add')) {
                if (!plannerData.focusTasks[taskId].subTasks) plannerData.focusTasks[taskId].subTasks = [];
                plannerData.focusTasks[taskId].subTasks.push({ title: '', todos: [] });
                saveData(); renderFocusView();
                const inputs = elements.focusTasksList.querySelectorAll(`.sub-title-input[data-task-id="${taskId}"]`);
                inputs[inputs.length - 1].focus();
            } else if (t.classList.contains('btn-delete-sub')) {
                plannerData.focusTasks[taskId].subTasks.splice(subId, 1);
                syncFocusTasksToCalendar();
                saveData(); renderFocusView();
            } else if (t.classList.contains('btn-todo-add')) {
                if (!plannerData.focusTasks[taskId].subTasks[subId].todos) plannerData.focusTasks[taskId].subTasks[subId].todos = [];
                plannerData.focusTasks[taskId].subTasks[subId].todos.push({ title: '', done: false });
                saveData(); renderFocusView();
                const inputs = elements.focusTasksList.querySelectorAll(`.todo-title-input[data-task-id="${taskId}"][data-sub-id="${subId}"]`);
                inputs[inputs.length - 1].focus();
            } else if (t.classList.contains('btn-delete-todo')) {
                plannerData.focusTasks[taskId].subTasks[subId].todos.splice(todoId, 1);
                syncFocusTasksToCalendar();
                saveData(); renderFocusView();
            } else if (t.closest('.sync-item')) {
                const jumpId = t.closest('.sync-item').dataset.jumpTaskId;
                currentView = 'focus';
                elements.navLinks.forEach(l => {
                    l.classList.toggle('active', l.dataset.view === 'focus');
                });
                renderActiveView();

                setTimeout(() => {
                    const targetCard = document.querySelector(`.focus-task-card[data-task-id="${jumpId}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetCard.classList.add('jump-highlight');
                        setTimeout(() => targetCard.classList.remove('jump-highlight'), 3000);
                    }
                }, 100);
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
                try {
                    plannerData = JSON.parse(ev.target.result);
                    // Ensure defensive initialization after import
                    if (!plannerData.settings) plannerData.settings = {};
                    if (!plannerData.settings.github) plannerData.settings.github = { username: '', repo: '', token: '' };
                    if (!plannerData.settings.holidays) plannerData.settings.holidays = {};
                    if (!plannerData.focusTasks) plannerData.focusTasks = [];
                    if (!plannerData.archivedTasks) plannerData.archivedTasks = [];

                    saveData();
                    syncFocusTasksToCalendar();
                    renderActiveView();
                    alert('Backup restored!');
                } catch (err) {
                    alert('Failed to parse backup file.');
                    console.error(err);
                }
            }; r.readAsText(f);
        });

        elements.importBtn.addEventListener('click', () => elements.importInput.click());

        // Day Editor Modal
        elements.closeDayModal.addEventListener('click', () => {
            elements.dayEditorModal.classList.add('hidden');
        });

        elements.saveDayBtn.addEventListener('click', () => {
            const { syncedItems } = parseCellContent(selectedDateKey);
            const syncMarker = "[[FOCUS_SYNC_START]]";
            const userContent = elements.modalDayInput.value.trim();
            const newContent = userContent + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
            plannerData.month[selectedDateKey] = newContent.trim();
            saveData();
            renderActiveView();
            elements.dayEditorModal.classList.add('hidden');
        });

        // Month Editor Modal (Year View)
        elements.closeMonthModal.addEventListener('click', () => {
            elements.monthEditorModal.classList.add('hidden');
        });

        elements.saveMonthBtn.addEventListener('click', () => {
            const content = elements.modalMonthInput.value.trim();
            plannerData.year[selectedMonthKey] = content;
            saveData();
            renderActiveView();
            elements.monthEditorModal.classList.add('hidden');
        });

        document.addEventListener('click', (e) => {
            const t = e.target.closest('.clickable-day');
            if (t && currentView === 'month') {
                const dateKey = t.dataset.date;
                selectedDateKey = dateKey;
                const { userContent } = parseCellContent(dateKey);
                elements.modalDateTitle.innerText = dateKey;
                elements.modalDayInput.value = userContent;
                elements.dayEditorModal.classList.remove('hidden');
                elements.modalDayInput.focus();
            }

            const tm = e.target.closest('.clickable-month');
            if (tm && currentView === 'year') {
                const monthKey = tm.dataset.month;
                selectedMonthKey = monthKey;
                const content = plannerData.year[monthKey] || '';
                elements.modalMonthTitle.innerText = new Date(monthKey + '-01').toLocaleString('default', { year: 'numeric', month: 'long' });
                elements.modalMonthInput.value = content;
                elements.monthEditorModal.classList.remove('hidden');
                elements.modalMonthInput.focus();
            }
        });


        // Date Header Navigation
        elements.headerDateDisplay.addEventListener('click', () => {
            elements.headerDateJump.showPicker();
        });

        elements.headerDateJump.addEventListener('change', (e) => {
            const selectedDate = new Date(e.target.value);
            if (!isNaN(selectedDate.getTime())) {
                currentDate = selectedDate;
                renderActiveView();
            }
        });

        // Holiday Editor Modal
        elements.addHolidayBtn.addEventListener('click', () => {
            elements.holidayModalName.value = '';
            elements.holidayModalRecurring.checked = false;
            elements.holidayModalSpecificContainer.classList.remove('hidden');
            elements.holidayModalRecurringContainer.classList.add('hidden');
            elements.holidayModalDate.value = getDateKey(new Date());
            elements.holidayModalRecurringDate.value = '';
            elements.holidayEditorModal.classList.remove('hidden');
        });

        elements.holidayModalRecurring.addEventListener('change', (e) => {
            if (e.target.checked) {
                elements.holidayModalSpecificContainer.classList.add('hidden');
                elements.holidayModalRecurringContainer.classList.remove('hidden');
            } else {
                elements.holidayModalSpecificContainer.classList.remove('hidden');
                elements.holidayModalRecurringContainer.classList.add('hidden');
            }
        });

        elements.closeHolidayModalBtn.addEventListener('click', () => {
            elements.holidayEditorModal.classList.add('hidden');
        });

        elements.saveHolidayModalBtn.addEventListener('click', () => {
            const name = elements.holidayModalName.value.trim();
            if (!name) { alert("Please enter a holiday name."); return; }

            let key = '';
            if (elements.holidayModalRecurring.checked) {
                key = elements.holidayModalRecurringDate.value.trim();
                if (!/^\d{2}-\d{2}$/.test(key)) {
                    alert("Invalid format for recurring holiday. Use MM-DD (e.g., 12-25).");
                    return;
                }
            } else {
                key = elements.holidayModalDate.value;
                if (!key) { alert("Please select a date."); return; }
            }

            plannerData.settings.holidays[key] = name;
            saveData();
            renderSettingsView();
            elements.holidayEditorModal.classList.add('hidden');
        });

        elements.holidayManagerContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete-holiday')) {
                const key = e.target.closest('.holiday-item').dataset.key;
                if (confirm(`Delete "${plannerData.settings.holidays[key]}"?`)) {
                    delete plannerData.settings.holidays[key];
                    saveData();
                    renderSettingsView();
                }
            }
        });

        elements.holidayManagerContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('holiday-name-input')) {
                const key = e.target.closest('.holiday-item').dataset.key;
                plannerData.settings.holidays[key] = e.target.value.trim();
                saveData();
            }
        });

        elements.saveGhSettingsBtn.addEventListener('click', () => {
            plannerData.settings.github.username = elements.ghUsernameInput.value.trim();
            plannerData.settings.github.repo = elements.ghRepoInput.value.trim();
            plannerData.settings.github.token = elements.ghTokenInput.value.trim();

            // Sync legacy storage for compatibility with syncWithGitHub functions if any
            localStorage.setItem('gh_username', plannerData.settings.github.username);
            localStorage.setItem('gh_repo', plannerData.settings.github.repo);
            localStorage.setItem('gh_token', plannerData.settings.github.token);

            saveData();
            alert("GitHub settings saved.");
        });

        // GitHub Sync
        if (elements.syncBtn) {
            elements.syncBtn.addEventListener('click', syncWithGitHub);
        }
    };

    init();
});
