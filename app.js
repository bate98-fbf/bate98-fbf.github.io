document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        dateDisplay: document.getElementById('current-date-display'),
        viewIndicator: document.getElementById('view-indicator'),
        navLinks: document.querySelectorAll('.nav-links li'),
        views: document.querySelectorAll('.planner-view'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        todayBtn: document.getElementById('today-btn'),
        saveDataBtn: document.getElementById('save-data-btn'),
        exportBtn: document.getElementById('export-btn'),
        importBtn: document.getElementById('import-btn'),
        importInput: document.getElementById('import-input'),
        ghUsernameInput: document.getElementById('settings-gh-username'),
        ghRepoInput: document.getElementById('settings-gh-repo'),
        ghTokenInput: document.getElementById('settings-gh-token'),
        saveGhSettingsBtn: document.getElementById('save-settings-gh'),
        holidayManagerContainer: document.getElementById('holiday-manager-container'),
        setExportFolderBtn: document.getElementById('set-export-folder-btn'),
        exportFolderDisplay: document.getElementById('export-folder-display'),
        yearView: document.getElementById('year-view'),
        monthView: document.getElementById('month-view'),
        weekView: document.getElementById('week-view'),
        dayView: document.getElementById('day-view'),
        upcomingPlansContainer: document.getElementById('upcoming-plans-container'),
        focusTasksList: document.getElementById('focus-tasks-list'),
        addTaskBtn: document.getElementById('add-task-btn'),
        syncBtn: document.getElementById('github-sync-btn'),
        settingsView: document.getElementById('settings-view'),
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
        closeMonthModal: document.getElementById('close-month-modal'),
        copyPlanBtn: document.getElementById('copy-plan-btn'),
        pastePlanBtn: document.getElementById('paste-plan-btn'),
        hideCompletedFocusBtn: document.getElementById('hide-completed-focus-tasks'),
        moveItemDatePicker: document.getElementById('move-item-date-picker'),
        // Memo Elements
        memoView: document.getElementById('memo-view'),
        addMemoBtn: document.getElementById('add-memo-btn'),
        memoSearch: document.getElementById('memo-search'),
        memoFilterCategory: document.getElementById('memo-filter-category'),
        memoList: document.getElementById('memo-list'),
        memoEditorModal: document.getElementById('memo-editor-modal'),
        memoModalTitle: document.getElementById('memo-modal-title'),
        memoTitleInput: document.getElementById('memo-title-input'),
        memoCategoryInput: document.getElementById('memo-category-input'),
        entryEditorModal: document.getElementById('entry-editor-modal'),
        entryModalTitle: document.getElementById('entry-modal-title'),
        entryContentInput: document.getElementById('entry-content-input'),
        saveEntryBtn: document.getElementById('save-entry-btn'),
        closeEntryModal: document.getElementById('close-entry-modal'),
        saveMemoBtn: document.getElementById('save-memo-btn'),
        closeMemoModalBtn: document.getElementById('close-memo-modal'),
        // Day View Progress
        dayProgressBar: document.getElementById('day-progress-bar'),
        dayProgressPercentage: document.getElementById('day-progress-percentage'),
        dayTaskCounts: document.getElementById('day-task-counts'),
        mainDayTodoInput: document.getElementById('main-day-todo-input'),
        addMainDayTodoBtn: document.getElementById('add-main-day-todo-btn'),
        unifiedTaskList: document.getElementById('unified-task-list'),
        taskMemoModal: document.getElementById('task-memo-modal'),
        taskMemoTitle: document.getElementById('task-memo-modal-title'),
        taskMemoInput: document.getElementById('task-memo-input'),
        saveTaskMemoBtn: document.getElementById('save-task-memo-btn'),
        closeTaskMemoModal: document.getElementById('close-task-memo-modal')
    };

    let currentDate = new Date();
    let currentView = 'day';
    let selectedDateKey = '';
    let selectedMonthKey = '';
    let moveSourceDate = '';
    let moveSourceIdx = -1;
    let draggedItem = null;
    let currentMemoTarget = null; // { type: 'focus-sub'|'weekly-todo', idOrText: string, date: string }

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
            holidays: {},
            memoCategories: ['일반', '프로젝트', '미팅', '기술', '기타'],
            hideCompletedFocusTasks: false
        };
        // Merge hardcoded holidays into settings
        Object.entries(HOLIDAYS.solar).forEach(([k, v]) => plannerData.settings.holidays[k] = v);
        Object.entries(HOLIDAYS.lunar_and_sub).forEach(([k, v]) => plannerData.settings.holidays[k] = v);
    }


    if (!plannerData.archivedTasks) plannerData.archivedTasks = [];
    if (!plannerData.assignees) plannerData.assignees = [];

    // Data Migration for Focus Tasks (convert legacy strings to objects + add UUIDs)
    const ensureIds = (task) => {
        if (!task.id) task.id = crypto.randomUUID();
        if (task.subTasks) {
            task.subTasks.forEach(sub => {
                if (!sub.id) sub.id = crypto.randomUUID();
                if (sub.todos) sub.todos.forEach(todo => {
                    if (!todo.id) todo.id = crypto.randomUUID();
                });
            });
        }
        return task;
    };

    if (plannerData.focusTasks) {
        plannerData.focusTasks = plannerData.focusTasks.map(task => {
            if (typeof task === 'string') task = { title: task, subTasks: [] };
            if (!task.subTasks) task.subTasks = [];
            return ensureIds(task);
        });
    }
    if (plannerData.archivedTasks) {
        plannerData.archivedTasks = plannerData.archivedTasks.map(task => ensureIds(task));
    }

    // Memo Migration (from single 'content' to 'entries' array)
    if (plannerData.memos) {
        plannerData.memos = plannerData.memos.map(memo => {
            if (memo.content !== undefined && !memo.entries) {
                // Determine if there was a timestamp in the old content
                let text = memo.content;
                let timestamp = `[${memo.date} 00:00:00]`; // Fallback
                const tsMatch = text.match(/<span class="memo-timestamp">(.*?)<\/span>/);
                if (tsMatch) {
                    timestamp = tsMatch[1];
                    text = text.replace(tsMatch[0], '').trim();
                }
                memo.entries = [{
                    id: crypto.randomUUID(),
                    text: text,
                    timestamp: timestamp
                }];
                delete memo.content;
            }
            if (!memo.entries) memo.entries = [];
            return memo;
        });
    } else {
        plannerData.memos = [];
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
        try {
            setupEventListeners();
            syncFocusTasksToCalendar();
            updateNetworkStatus();
            renderActiveView();
        } catch (e) {
            console.error("Initialization error:", e);
            renderActiveView(); // Try to render even if some init steps fail
        }
    };

    const updateNetworkStatus = () => {
        /* Network status logic removed */
    };

    const parseMarkdownList = (text) => {
        if (!text) return [];
        const lines = text.split('\n');
        return lines.map(line => {
            const match = line.match(/^(\s*)-\s*\[([ xX-])\]\s*(.*)$/);
            if (match) {
                const char = match[2].toLowerCase();
                return {
                    done: char === 'x',
                    progress: char === '-',
                    text: match[3].trim()
                };
            }
            return { done: false, progress: false, text: line.trim() };
        }).filter(item => item.text.length > 0);
    };

    const serializeMarkdownList = (items) => {
        return items.map(item => {
            let char = ' ';
            if (item.done) char = 'x';
            else if (item.progress) char = '-';
            return `- [${char}] ${item.text}`;
        }).join('\n');
    };

    const saveData = () => localStorage.setItem('antigravity_planner_data', JSON.stringify(plannerData));

    // IndexedDB Helper for File System Access API handles
    const DB_NAME = 'PlannerFileSystemDB';
    const STORE_NAME = 'handles';
    const initDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    };

    const storeHandle = async (key, handle) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put(handle, key);
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e.target.error);
        });
    };

    const getHandle = async (key) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(key);
            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    };

    const verifyPermission = async (handle, readWrite) => {
        const options = {};
        if (readWrite) options.mode = 'readwrite';
        if ((await handle.queryPermission(options)) === 'granted') return true;
        if ((await handle.requestPermission(options)) === 'granted') return true;
        return false;
    };

    const renderActiveView = () => {
        updateHeader();
        elements.views.forEach(v => v.classList.add('hidden'));
        document.getElementById(`${currentView}-view`).classList.remove('hidden');

        // Handle visibility of date pager
        const isFocusView = currentView === 'focus';
        const isSettingsView = currentView === 'settings';
        const isMemoView = currentView === 'memo';
        const hidePager = isFocusView || isSettingsView || isMemoView;
        elements.prevBtn.style.visibility = hidePager ? 'hidden' : 'visible';
        elements.nextBtn.style.visibility = hidePager ? 'hidden' : 'visible';
        elements.todayBtn.style.visibility = hidePager ? 'hidden' : 'visible';

        if (currentView === 'day') renderDayView();
        else if (currentView === 'week') renderWeekView();
        else if (currentView === 'month') renderMonthView();
        else if (currentView === 'year') renderYearView();
        else if (currentView === 'focus') renderFocusView();
        else if (currentView === 'settings') renderSettingsView();
        else if (currentView === 'memo') renderMemoView();
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
        let displayStr = "";
        if (currentView === 'month') {
            displayStr = currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
        } else if (currentView === 'year') {
            displayStr = currentDate.getFullYear();
        } else {
            const datePart = currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const dayPart = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
            displayStr = `${datePart} ${dayPart}`;
        }
        elements.dateDisplay.textContent = displayStr;

        // Centralized nav active class management
        elements.navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === currentView));

        const viewLabels = {
            'year': 'Long-term Vision & Goals',
            'month': 'Monthly Objectives & Key Events',
            'week': 'Weekly Schedule & Priorities',
            'day': 'Daily Focus & Detailed Report',
            'focus': '중점 추진 사항 (Core Focus)',
            'memo': 'Professional Work Memo & Knowledge Base',
            'settings': 'Configuration & Sync Settings'
        };
        elements.viewIndicator.textContent = viewLabels[currentView] || `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} View`;
    };

    const renderDayView = () => {
        const dateKey = getDateKey(currentDate);
        if (!plannerData.day[dateKey]) plannerData.day[dateKey] = { activities: {}, focus: {}, goals: '', reflectionGood: '', reflectionBetter: '' };
        const dayData = plannerData.day[dateKey];
        if (!dayData.activities) dayData.activities = {};
        if (!dayData.focus) dayData.focus = {};

        // Set inputs in sidebar
        document.getElementById('daily-goals').value = dayData.goals || '';
        document.getElementById('reflection-good').value = dayData.reflectionGood || '';
        document.getElementById('reflection-better').value = dayData.reflectionBetter || '';

        // Initialize itemMemos if missing
        if (!dayData.itemMemos) dayData.itemMemos = {};

        updateDayProgress();
        renderUnifiedTaskBoard();
        renderUpcomingPlans();
    };

    const renderUnifiedTaskBoard = () => {
        elements.unifiedTaskList.innerHTML = '';
        renderDayFocusTasksSection();
        renderDayWeeklyTasksSection();
    };

    const updateDayProgress = () => {
        const dateKey = getDateKey(currentDate);

        // Count focus tasks
        const focusTasksToday = (plannerData.focusTasks || []).flatMap(task =>
            (task.subTasks || []).filter(sub => sub.dueDate === dateKey)
        );

        // Count weekly tasks (진행사항)
        const { userContent } = parseCellContent(dateKey);
        const weeklyTasksToday = parseMarkdownList(userContent);

        const allTasks = [
            ...focusTasksToday.map(s => ({ done: s.done })),
            ...weeklyTasksToday.map(w => ({ done: w.done }))
        ];

        const total = allTasks.length;
        const done = allTasks.filter(t => t.done).length;
        const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

        elements.dayProgressBar.style.width = `${percentage}%`;
        elements.dayProgressPercentage.textContent = `${percentage}%`;
        elements.dayTaskCounts.textContent = `${done} / ${total} tasks completed`;
    };


    const renderDayFocusTasksSection = () => {
        const dateKey = getDateKey(currentDate);
        const focusTasksToday = (plannerData.focusTasks || []).flatMap(task =>
            (task.subTasks || []).filter(sub => sub.dueDate === dateKey).map(sub => ({ ...sub, parentTitle: task.title }))
        );

        const section = document.createElement('div');
        section.className = 'task-category-section';
        section.innerHTML = `
            <div class="task-category-header">추진사항</div>
            <div class="task-category-content" id="board-focus-tasks"></div>
        `;
        elements.unifiedTaskList.appendChild(section);
        const container = section.querySelector('#board-focus-tasks');

        if (focusTasksToday.length === 0) {
            container.innerHTML = '<div class="empty-state">No core focus tasks for today.</div>';
            return;
        }

        focusTasksToday.forEach(sub => {
            const item = document.createElement('div');
            item.className = `day-todo-item ${sub.done ? 'done' : ''}`;
            const status = sub.status || (sub.done ? 'done' : 'wait');

            const memoActive = sub.memo && sub.memo.trim().length > 0;

            item.innerHTML = `
                <div class="status-icon status-${status}" data-task-id="${sub.id}" data-type="focus-sub"></div>
                <div style="flex:1">
                    <div style="font-size: 0.7rem; color: var(--text-secondary); opacity: 0.8">${sub.parentTitle}</div>
                    <span>${sub.title}</span>
                </div>
                <div class="btn-task-memo ${memoActive ? 'active' : ''}" data-task-id="${sub.id}" data-type="focus-sub" title="Memo">📝</div>
            `;
            container.appendChild(item);
        });
    };

    const renderDayWeeklyTasksSection = () => {
        const dateKey = getDateKey(currentDate);
        const { userContent } = parseCellContent(dateKey);
        const items = parseMarkdownList(userContent);

        const section = document.createElement('div');
        section.className = 'task-category-section';
        section.innerHTML = `
            <div class="task-category-header">진행사항</div>
            <div class="task-category-content" id="board-weekly-tasks"></div>
        `;
        elements.unifiedTaskList.appendChild(section);
        const container = section.querySelector('#board-weekly-tasks');

        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state">No weekly tasks listed for today.</div>';
            return;
        }

        items.forEach((it, idx) => {
            const item = document.createElement('div');
            item.className = `day-todo-item ${it.done ? 'done' : ''}`;
            const status = it.done ? 'done' : (it.progress ? 'progress' : 'wait');

            const dateKey = getDateKey(currentDate);
            const dayData = plannerData.day[dateKey] || {};
            const memoActive = dayData.itemMemos && dayData.itemMemos[it.text];

            item.innerHTML = `
                <div class="status-icon status-${status}" data-idx="${idx}" data-type="weekly-todo"></div>
                <span style="flex:1">${it.text}</span>
                <div class="btn-task-memo ${memoActive ? 'active' : ''}" data-idx="${idx}" data-text="${it.text}" data-type="weekly-todo" title="Memo">📝</div>
            `;
            container.appendChild(item);
        });
    };

    const renderUpcomingPlans = () => {
        elements.upcomingPlansContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() + i);
            const dateKey = getDateKey(date);
            const { userContent } = parseCellContent(dateKey);
            const items = parseMarkdownList(userContent);
            const isToday = i === 0;

            const options = { month: 'short', day: 'numeric', weekday: 'short' };
            const dateDisplay = date.toLocaleDateString('ko-KR', options);
            const hName = getHolidayName(date);

            const itemsHtml = items.length > 0 ? `<div class="upcoming-checklist">
                ${items.map(it => {
                const statusIcon = it.done ? '✅' : (it.progress ? '▶' : '⬜');
                return `<div class="compact-todo-item ${it.done ? 'done' : ''}">${statusIcon} ${it.text}</div>`;
            }).join('')}
            </div>` : `<div class="upcoming-plan-content">${userContent}</div>`;

            const div = document.createElement('div');
            div.className = `upcoming-plan-item ${isToday ? 'today' : ''}`;
            div.innerHTML = `
                <div class="upcoming-plan-date">
                    <span>${dateDisplay} ${isToday ? '(Today)' : ''}</span>
                    ${hName ? `<span class="badge ${isSaturday(date) ? 'is-saturday' : (isHoliday(date) ? 'is-holiday' : '')}">${hName}</span>` : ''}
                </div>
                ${itemsHtml}
            `;
            elements.upcomingPlansContainer.appendChild(div);
        }
    };

    const renderMonthView = () => {
        const y = currentDate.getFullYear(), m = currentDate.getMonth();
        const monthYearKey = `${y}-${(m + 1).toString().padStart(2, '0')}`;
        const yearlyGoal = plannerData.year[monthYearKey] || 'No yearly goal set for this month.';

        const nextMonthDate = new Date(y, m + 1, 1);
        const ny = nextMonthDate.getFullYear(), nm = nextMonthDate.getMonth();

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
            <div class="calendar-multi-container">
                <div class="month-grid-section">
                    <h3 class="month-grid-title">${currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}</h3>
                    ${generateCalendarGridHTML(y, m)}
                </div>
                <div class="month-grid-section">
                    <h3 class="month-grid-title">${nextMonthDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}</h3>
                    ${generateCalendarGridHTML(ny, nm)}
                </div>
            </div>
        </div>`;
        elements.monthView.innerHTML = html;
    };

    const generateCalendarGridHTML = (y, m) => {
        let gridHtml = `<div class="calendar-grid">`;
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => gridHtml += `<div class="calendar-day header">${d}</div>`);
        const first = new Date(y, m, 1).getDay();
        const last = new Date(y, m + 1, 0).getDate();
        for (let i = 0; i < first; i++) gridHtml += '<div class="calendar-day muted"></div>';
        for (let d = 1; d <= last; d++) {
            const date = new Date(y, m, d);
            const dateKey = getDateKey(date);
            const { userContent, syncedItems } = parseCellContent(dateKey);
            const items = parseMarkdownList(userContent);
            const classList = ['calendar-day', 'clickable-day'];
            const hName = getHolidayName(date);
            if (isHoliday(date)) classList.push('is-holiday');
            if (isSaturday(date)) classList.push('is-saturday');

            const syncHtml = (syncedItems || []).map(item => `
                <div class="sync-item" data-jump-task-id="${item.id}">
                    🚩 <span class="sync-item-type">${item.type.toUpperCase()}</span> ${item.title}
                </div>
            `).join('');

            const contentHtml = items.length > 0
                ? items.map(it => {
                    const status = it.done ? 'done' : (it.progress ? 'progress' : 'wait');
                    return `<div class="calendar-todo-item ${it.done ? 'done' : ''}">
                        <span class="status-icon mini status-${status}"></span> ${it.text}
                    </div>`;
                }).join('')
                : userContent;

            gridHtml += `<div class="${classList.join(' ')}" data-date="${dateKey}">
                <strong>${d}${hName ? `<span class="holiday-name">${hName}</span>` : ''}</strong>
                <div class="calendar-day-content">${contentHtml}</div>
                <div class="sync-list">${syncHtml}</div>
            </div>`;
        }
        gridHtml += '</div>';
        return gridHtml;
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
            const items = parseMarkdownList(userContent);
            const badgeClass = ['badge'];
            const hName = getHolidayName(d);
            if (isHoliday(d)) badgeClass.push('is-holiday');
            if (isSaturday(d)) badgeClass.push('is-saturday');

            const syncHtml = syncedItems.map(item => `
                <div class="sync-item" data-jump-task-id="${item.id}">
                    🚩 <span class="sync-item-type">${item.type.toUpperCase()}</span> ${item.title}
                </div>
            `).join('');

            let itemsHtml = items.map((item, idx) => {
                const status = item.done ? 'done' : (item.progress ? 'progress' : 'wait');
                return `
                    <div class="weekly-item ${item.done ? 'done' : ''}" draggable="true" data-date="${dateKey}" data-idx="${idx}">
                        <div class="status-icon status-${status}" data-idx="${idx}" data-date="${dateKey}" data-type="weekly-todo"></div>
                        <span class="weekly-item-text">${item.text}</span>
                        <div class="weekly-item-actions">
                            <button class="btn-item-move" data-date="${dateKey}" data-idx="${idx}" title="Move to another date">📅</button>
                            <button class="btn-item-delete" data-date="${dateKey}" data-idx="${idx}" title="Delete">×</button>
                        </div>
                    </div>
                `;
            }).join('');

            html += `<div class="weekly-day-col" data-drop-zone="true" data-date="${dateKey}">
                <div class="${badgeClass.join(' ')}">
                    ${d.toLocaleDateString('ko-KR', { weekday: 'short', day: 'numeric' })}
                    ${hName ? `<span class="holiday-name">${hName}</span>` : ''}
                </div>
                <div class="weekly-items-container" id="items-${dateKey}">
                    ${itemsHtml}
                </div>
                <div class="weekly-input-group">
                    <input type="text" class="weekly-item-add-input" placeholder="Add item..." data-date="${dateKey}">
                    <button class="btn-weekly-add" data-date="${dateKey}">+</button>
                </div>
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

    const renderSettingsView = async () => {
        // GitHub Config
        elements.ghUsernameInput.value = plannerData.settings.github.username;
        elements.ghRepoInput.value = plannerData.settings.github.repo;
        elements.ghTokenInput.value = plannerData.settings.github.token;

        // Export Folder Display
        const dirHandle = await getHandle('exportFolder');
        if (dirHandle) {
            elements.exportFolderDisplay.textContent = `Current Folder: ${dirHandle.name}`;
            elements.exportFolderDisplay.style.color = 'var(--accent-color)';
        } else {
            elements.exportFolderDisplay.textContent = 'Not set (using default download)';
            elements.exportFolderDisplay.style.color = 'var(--text-secondary)';
        }

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

        // Category Manager
        const categoryContainer = document.getElementById('category-manager-container');
        if (categoryContainer) {
            let catHtml = '';
            (plannerData.settings.memoCategories || []).forEach((cat, idx) => {
                catHtml += `
                    <div class="category-item" data-idx="${idx}">
                        <input type="text" class="category-name-input" value="${cat}" placeholder="Category Name">
                        <button class="btn-delete-category" title="Delete category">×</button>
                    </div>
                `;
            });
            categoryContainer.innerHTML = catHtml || '<p style="text-align:center; color:var(--text-secondary);">No categories defined.</p>';
        }
    };

    const renderFocusView = () => {
        elements.focusTasksList.innerHTML = '';

        if (elements.hideCompletedFocusBtn) {
            elements.hideCompletedFocusBtn.checked = !!plannerData.settings.hideCompletedFocusTasks;
        }

        // Add datalist for assignees once
        let datalist = document.getElementById('assignees-list');
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'assignees-list';
            document.body.appendChild(datalist);
        }
        datalist.innerHTML = (plannerData.assignees || []).map(a => `<option value="${a}">`).join('');

        const renderTaskRows = (task, isArchived = false) => {
            const rows = [];
            const hideCompleted = plannerData.settings.hideCompletedFocusTasks && !isArchived;
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
            taskEl.className = `task-row task-level ${isArchived ? 'archived' : ''}`;
            taskEl.dataset.taskId = task.id;
            taskEl.dataset.type = 'task';
            if (!isArchived) taskEl.draggable = true;

            // Render main task content
            taskEl.innerHTML = `
                <div class="col-title">
                    <div style="display:flex; align-items:center;">
                        <button class="btn-toggle-task-collapse" data-task-id="${task.id}" title="${task.collapsed ? 'Expand' : 'Collapse'}">
                            ${task.collapsed ? '▶' : '▼'}
                        </button>
                        <input type="checkbox" class="task-check" ${task.done ? 'checked' : ''} data-task-id="${task.id}" data-type="task" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        <div style="flex:1; display: flex; align-items: center; min-height: 25px;">
                            <div class="markdown-display" data-task-id="${task.id}" data-type="task">
                                ${marked.parse(task.title || 'Main Task Title...')}
                            </div>
                            <input type="text" class="task-title-input hidden-input" placeholder="Main Task Title..." data-task-id="${task.id}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}" value="${task.title || ''}">
                            <div class="task-progress-mini"><div class="task-progress-bar-mini" style="width: ${progress}%"></div></div>
                        </div>
                    </div>
                </div>
                <div class="col-owner">
                    <input type="text" class="meta-input" value="${task.owner || ''}" placeholder="Assignee" data-task-id="${task.id}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                </div>
                <div class="col-due">
                    <input type="date" class="meta-input" value="${task.dueDate || ''}" data-task-id="${task.id}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                </div>
                <div class="col-status"><span class="progress-badge">${progress}%</span></div>
                <div class="col-actions">
                    <div class="header-btns">
                        ${isArchived ? `
                            <button class="btn-restore-task" data-task-id="${task.id}" title="Restore Task">↺</button>
                        ` : `
                            <button class="btn-sub-add" data-task-id="${task.id}" title="Add Sub-Task">+ Sub</button>
                            <button class="btn-complete-task" data-task-id="${task.id}" title="Complete & Archive">✔</button>
                        `}
                        <button class="btn-delete-task" data-task-id="${task.id}" data-is-archived="${isArchived}" title="Delete Task">×</button>
                    </div>
                </div>
            `;
            rows.push(taskEl);

            if (!task.collapsed) {
                (task.subTasks || []).forEach(sub => {
                    if (!sub.todos) sub.todos = [];
                    const allSubTodosDone = sub.todos.length > 0 && sub.todos.every(t => t.done);
                    if (hideCompleted && allSubTodosDone) return;

                    const subEl = document.createElement('div');
                    subEl.className = `task-row sub-level ${isArchived ? 'archived' : ''}`;
                    subEl.dataset.taskId = task.id;
                    subEl.dataset.subId = sub.id;
                    subEl.dataset.type = 'sub';
                    if (!isArchived) subEl.draggable = true;
                    subEl.innerHTML = `
                        <div class="col-title">
                            <div style="display:flex; align-items:center;">
                                <button class="btn-toggle-collapse" data-task-id="${task.id}" data-sub-id="${sub.id}" title="${sub.collapsed ? 'Expand' : 'Collapse'}">
                                    ${sub.collapsed ? '▶' : '▼'}
                                </button>
                                <input type="checkbox" class="sub-check" ${sub.done ? 'checked' : ''} data-task-id="${task.id}" data-sub-id="${sub.id}" data-type="sub" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                <div class="markdown-display" data-task-id="${task.id}" data-sub-id="${sub.id}" data-type="sub">
                                    ${marked.parse(sub.title || 'Sub-Task Title...')}
                                </div>
                                <input type="text" class="sub-title-input hidden-input" placeholder="Sub-Task Title..." data-task-id="${task.id}" data-sub-id="${sub.id}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}" value="${sub.title || ''}">
                            </div>
                        </div>
                        <div class="col-owner">
                            <input type="text" class="meta-input" value="${sub.owner || ''}" placeholder="Assignee" data-task-id="${task.id}" data-sub-id="${sub.id}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        </div>
                        <div class="col-due">
                            <input type="date" class="meta-input" value="${sub.dueDate || ''}" data-task-id="${task.id}" data-sub-id="${sub.id}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                        </div>
                        <div class="col-status"></div>
                        <div class="col-actions">
                            ${!isArchived ? `
                            <div class="header-btns">
                                <button class="btn-todo-add" data-task-id="${task.id}" data-sub-id="${sub.id}">+ Todo</button>
                                <button class="btn-delete-sub" data-task-id="${task.id}" data-sub-id="${sub.id}">×</button>
                            </div>
                            ` : ''}
                        </div>
                    `;
                    rows.push(subEl);

                    if (!sub.collapsed) {
                        sub.todos.forEach(todo => {
                            if (hideCompleted && todo.done) return;
                            const todoEl = document.createElement('div');
                            todoEl.className = `task-row todo-level ${isArchived ? 'archived' : ''}`;
                            todoEl.dataset.taskId = task.id;
                            todoEl.dataset.subId = sub.id;
                            todoEl.dataset.todoId = todo.id;
                            todoEl.dataset.type = 'todo';
                            if (!isArchived) todoEl.draggable = true;
                            todoEl.innerHTML = `
                            <div class="col-title">
                                <div style="display:flex; align-items:center;">
                                    <span style="width: 20px; display: inline-block;"></span> <!-- Spacer for missing toggle -->
                                    <input type="checkbox" class="todo-check" ${todo.done ? 'checked' : ''} data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                                    <div class="markdown-display" data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}" data-type="todo">
                                        ${marked.parse(todo.title || 'What needs to be done?')}
                                    </div>
                                    <input type="text" class="todo-title-input hidden-input" placeholder="What needs to be done?" data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}" data-field="title" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}" value="${todo.title || ''}">
                                </div>
                            </div>
                            <div class="col-owner">
                                <input type="text" class="meta-input" value="${todo.owner || ''}" placeholder="Owner" data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}" data-field="owner" list="assignees-list" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                            </div>
                            <div class="col-due">
                                <input type="date" class="meta-input" value="${todo.dueDate || ''}" data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}" data-field="dueDate" ${isArchived ? 'disabled' : ''} data-is-archived="${isArchived}">
                            </div>
                            <div class="col-status"></div>
                            <div class="col-actions">
                                ${!isArchived ? `<div class="header-btns"><button class="btn-delete-todo" data-task-id="${task.id}" data-sub-id="${sub.id}" data-todo-id="${todo.id}">×</button></div>` : ''}
                            </div>
                        `;
                            rows.push(todoEl);
                        });
                    }
                });
            }
            return rows;
        };

        if (plannerData.focusTasks.length === 0 && plannerData.archivedTasks.length === 0) {
            elements.focusTasksList.innerHTML = '<div class="empty-state">No focus tasks active. Click "+ Add New Task" to begin.</div>';
            return;
        }

        // Render Active Tasks
        plannerData.focusTasks.forEach((task) => {
            renderTaskRows(task, false).forEach(row => elements.focusTasksList.appendChild(row));
        });

        // Render Archive Section if any
        if (plannerData.archivedTasks.length > 0) {
            const archiveHeader = document.createElement('div');
            archiveHeader.className = 'archive-header';
            archiveHeader.innerHTML = `<h3>Archive (Completed Tasks)</h3><div class="archive-divider"></div>`;
            elements.focusTasksList.appendChild(archiveHeader);

            plannerData.archivedTasks.forEach((task) => {
                renderTaskRows(task, true).forEach(row => elements.focusTasksList.appendChild(row));
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

    const deepMerge = (target, source) => {
        const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

        // If source is not an object or target is not an object, source wins
        if (!isObject(source)) return source;
        if (!isObject(target)) {
            // If target is missing but source exists, return a deep copy of source
            return JSON.parse(JSON.stringify(source));
        }

        const merged = { ...target };

        Object.keys(source).forEach(key => {
            const sVal = source[key];
            const tVal = target[key];

            if (isObject(sVal)) {
                if (!(key in target)) {
                    merged[key] = JSON.parse(JSON.stringify(sVal));
                } else {
                    merged[key] = deepMerge(tVal, sVal);
                }
            } else if (Array.isArray(sVal)) {
                // Smart Merge for Arrays: Check if it's an array of objects with IDs
                const isIdArray = sVal.length > 0 && sVal[0] && typeof sVal[0] === 'object' && sVal[0].id;
                const isAssignees = key === 'assignees';

                if (isIdArray || isAssignees) {
                    const targetArr = Array.isArray(tVal) ? tVal : [];
                    if (isAssignees) {
                        merged[key] = [...new Set([...targetArr, ...sVal])];
                    } else {
                        const map = new Map();
                        targetArr.forEach(item => { if (item.id) map.set(item.id, item); });
                        sVal.forEach(item => {
                            if (item.id) {
                                if (map.has(item.id)) {
                                    map.set(item.id, deepMerge(map.get(item.id), item));
                                } else {
                                    map.set(item.id, JSON.parse(JSON.stringify(item)));
                                }
                            }
                        });
                        merged[key] = Array.from(map.values());
                    }
                } else {
                    // Default array handling: overwrite
                    merged[key] = JSON.parse(JSON.stringify(sVal));
                }
            } else {
                // Primitives (Strings, Numbers, Booleans)
                if (typeof sVal === 'string') {
                    // Prioritize non-empty strings to prevent data loss during cross-device sync
                    if (sVal.trim() !== '') {
                        merged[key] = sVal;
                    } else if (!tVal || (typeof tVal === 'string' && tVal.trim() === '')) {
                        merged[key] = sVal;
                    }
                    // if sVal is empty and tVal has content, we KEEP tVal
                } else if (sVal !== null && sVal !== undefined) {
                    merged[key] = sVal;
                }
            }
        });
        return merged;
    };

    const mergePlannerData = (local, remote) => {
        // Create a deep copy of local to protect settings
        const localGitHub = { ...((local.settings && local.settings.github) || {}) };

        // Use deepMerge to combine data
        const merged = deepMerge(local, remote);

        // Restore local GitHub settings
        if (merged.settings) merged.settings.github = localGitHub;

        return merged;
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

    const getTimestamp = (date) => {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const hh = date.getHours().toString().padStart(2, '0');
        const mm = date.getMinutes().toString().padStart(2, '0');
        const ss = date.getSeconds().toString().padStart(2, '0');
        return `${y}-${m}-${d}_${hh}${mm}${ss}`;
    };

    const syncFocusTasksToCalendar = () => {
        const syncMarker = "[[FOCUS_SYNC_START]]";
        const entriesByDate = {};

        // Collect all active focus task items with due dates
        plannerData.focusTasks.forEach((task) => {
            if (task.dueDate) {
                if (!entriesByDate[task.dueDate]) entriesByDate[task.dueDate] = [];
                entriesByDate[task.dueDate].push({ id: task.id, type: 'task', title: task.title || 'Untitled' });
            }
            (task.subTasks || []).forEach(sub => {
                if (sub.dueDate) {
                    if (!entriesByDate[sub.dueDate]) entriesByDate[sub.dueDate] = [];
                    entriesByDate[sub.dueDate].push({ id: task.id, type: 'sub', title: sub.title || 'Untitled' });
                }
                (sub.todos || []).forEach(todo => {
                    if (todo.dueDate) {
                        if (!entriesByDate[todo.dueDate]) entriesByDate[todo.dueDate] = [];
                        entriesByDate[todo.dueDate].push({ id: task.id, type: 'todo', title: todo.title || 'Untitled' });
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
            currentView = link.dataset.view;

            // Reset to today when clicking Day, Week, or Month
            if (['day', 'week', 'month'].includes(currentView)) {
                currentDate = new Date();
            }

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
            }
            saveData();
        });

        // Focus View Drag & Drop logic
        let draggedRow = null;

        document.addEventListener('dragstart', (e) => {
            if (currentView !== 'focus') return;
            const t = e.target.closest('.task-row');
            if (t) {
                draggedRow = t;
                t.classList.add('dragging');
                e.dataTransfer.setData('text/plain', '');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragover', (e) => {
            if (currentView !== 'focus' || !draggedRow) return;
            e.preventDefault();
            const t = e.target.closest('.task-row');
            if (!t || t === draggedRow) return;

            const rect = t.getBoundingClientRect();
            const relY = e.clientY - rect.top;
            t.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');

            const draggedType = draggedRow.dataset.type;
            const targetType = t.dataset.type;

            if (draggedType === 'sub' && targetType === 'task') {
                t.classList.add('drag-over-inside');
            } else if (draggedType === 'todo' && targetType === 'sub') {
                t.classList.add('drag-over-inside');
            } else if (draggedType === targetType) {
                if (relY < rect.height / 2) t.classList.add('drag-over-top');
                else t.classList.add('drag-over-bottom');
            }
        });

        document.addEventListener('dragleave', (e) => {
            const t = e.target.closest('.task-row');
            if (t) t.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
        });

        document.addEventListener('drop', (e) => {
            if (currentView !== 'focus' || !draggedRow) return;
            e.preventDefault();
            const t = e.target.closest('.task-row');
            if (!t || t === draggedRow) {
                draggedRow.classList.remove('dragging');
                draggedRow = null;
                return;
            }

            const draggedType = draggedRow.dataset.type;
            const targetType = t.dataset.type;
            const draggedTaskId = draggedRow.dataset.taskId;
            const draggedSubId = draggedRow.dataset.subId;
            const draggedTodoId = draggedRow.dataset.todoId;

            const rect = t.getBoundingClientRect();
            const relY = e.clientY - rect.top;
            const placement = relY < rect.height / 2 ? 'before' : 'after';

            if (draggedType === 'task' && targetType === 'task') {
                const list = plannerData.focusTasks;
                const dIdx = list.findIndex(i => i.id === draggedTaskId);
                const [item] = list.splice(dIdx, 1);
                const tIdx = list.findIndex(i => i.id === t.dataset.taskId);
                list.splice(placement === 'before' ? tIdx : tIdx + 1, 0, item);
            } else if (draggedType === 'sub') {
                const oldParent = plannerData.focusTasks.find(i => i.id === draggedTaskId);
                const sIdx = oldParent.subTasks.findIndex(s => s.id === draggedSubId);
                const [item] = oldParent.subTasks.splice(sIdx, 1);
                if (targetType === 'task' && (placement === 'after' || e.target.closest('.task-row').classList.contains('drag-over-inside'))) {
                    const newParent = plannerData.focusTasks.find(i => i.id === t.dataset.taskId);
                    if (!newParent.subTasks) newParent.subTasks = [];
                    newParent.subTasks.unshift(item);
                } else {
                    const newParent = plannerData.focusTasks.find(i => i.id === t.dataset.taskId);
                    const tIdx = newParent.subTasks.findIndex(s => s.id === t.dataset.subId);
                    newParent.subTasks.splice(placement === 'before' ? tIdx : tIdx + 1, 0, item);
                }
            } else if (draggedType === 'todo') {
                const oldRoot = plannerData.focusTasks.find(i => i.id === draggedTaskId);
                const oldSub = oldRoot.subTasks.find(s => s.id === draggedSubId);
                const tdIdx = oldSub.todos.findIndex(td => td.id === draggedTodoId);
                const [item] = oldSub.todos.splice(tdIdx, 1);
                if (targetType === 'sub' && (placement === 'after' || e.target.closest('.task-row').classList.contains('drag-over-inside'))) {
                    const newRoot = plannerData.focusTasks.find(i => i.id === t.dataset.taskId);
                    const newSub = newRoot.subTasks.find(s => s.id === t.dataset.subId);
                    if (!newSub.todos) newSub.todos = [];
                    newSub.todos.unshift(item);
                } else if (targetType === 'todo') {
                    const newRoot = plannerData.focusTasks.find(i => i.id === t.dataset.taskId);
                    const newSub = newRoot.subTasks.find(s => s.id === t.dataset.subId);
                    const tIdx = newSub.todos.findIndex(td => td.id === t.dataset.todoId);
                    newSub.todos.splice(placement === 'before' ? tIdx : tIdx + 1, 0, item);
                }
            }
            t.classList.remove('drag-over-top', 'drag-over-bottom', 'drag-over-inside');
            draggedRow.classList.remove('dragging');
            draggedRow = null;
            saveData();
            renderFocusView();
        });

        document.addEventListener('input', (e) => {
            const t = e.target;
            if (t.classList.contains('auto-expand')) {
                t.style.height = 'auto';
                t.style.height = t.scrollHeight + 'px';
            }
            if (currentView === 'focus') {
                const { taskId, subId, todoId, field, isArchived } = t.dataset;
                if (taskId) {
                    const taskList = isArchived === 'true' ? plannerData.archivedTasks : plannerData.focusTasks;
                    const task = taskList.find(i => i.id === taskId);
                    if (task) {
                        if (subId) {
                            const sub = task.subTasks.find(s => s.id === subId);
                            if (sub) {
                                if (todoId) {
                                    const todo = sub.todos.find(td => td.id === todoId);
                                    if (todo) {
                                        if (t.type === 'checkbox') todo.done = t.checked;
                                        else todo[field] = t.value;
                                    }
                                } else {
                                    if (t.type === 'checkbox') sub.done = t.checked;
                                    else sub[field] = t.value;
                                }
                            }
                        } else {
                            if (t.type === 'checkbox') task.done = t.checked;
                            else task[field] = t.value;
                        }
                        if (field === 'owner' && t.value.trim().length > 0) {
                            if (!plannerData.assignees) plannerData.assignees = [];
                            if (!plannerData.assignees.includes(t.value.trim())) plannerData.assignees.push(t.value.trim());
                        }
                        if (field === 'dueDate' || field === 'title') syncFocusTasksToCalendar();
                        saveData();
                        if (e.target.type === 'checkbox') renderFocusView();
                    }
                }
            }
        });

        document.addEventListener('change', (e) => {
            const t = e.target;
            if (currentView === 'day' && t.tagName === 'TEXTAREA' && t.dataset.field) {
                const dk = getDateKey(currentDate);
                if (!plannerData.day[dk]) plannerData.day[dk] = { activities: {}, focus: {} };
                plannerData.day[dk][t.dataset.field] = t.value;
                saveData();
            }
        });

        if (elements.addTaskBtn) {
            elements.addTaskBtn.addEventListener('click', () => {
                plannerData.focusTasks.push({ id: crypto.randomUUID(), title: '', subTasks: [], created: getDateKey(new Date()) });
                saveData();
                renderFocusView();
                const inputs = elements.focusTasksList.querySelectorAll('.task-title-input');
                if (inputs.length > 0) inputs[inputs.length - 1].focus();
            });
        }

        document.addEventListener('click', (e) => {
            const t = e.target;
            const { taskId, subId, todoId, isArchived } = t.dataset;
            const isArchivedBool = isArchived === 'true';

            if (t.classList.contains('btn-toggle-task-collapse')) {
                const targetList = isArchivedBool ? plannerData.archivedTasks : plannerData.focusTasks;
                const task = targetList.find(i => i.id === taskId);
                task.collapsed = !task.collapsed;
                saveData(); renderFocusView();
                return;
            }
            if (t.classList.contains('btn-toggle-collapse')) {
                const targetList = isArchivedBool ? plannerData.archivedTasks : plannerData.focusTasks;
                const task = targetList.find(i => i.id === taskId);
                const sub = task.subTasks.find(s => s.id === subId);
                sub.collapsed = !sub.collapsed;
                saveData(); renderFocusView();
                return;
            }
            const taskList = isArchivedBool ? plannerData.archivedTasks : plannerData.focusTasks;
            if (t.classList.contains('btn-delete-task')) {
                const idx = taskList.findIndex(i => i.id === taskId);
                if (idx !== -1 && confirm('Delete this task?')) {
                    taskList.splice(idx, 1);
                    syncFocusTasksToCalendar(); saveData(); renderFocusView();
                }
            } else if (t.classList.contains('btn-complete-task')) {
                const idx = plannerData.focusTasks.findIndex(i => i.id === taskId);
                if (idx !== -1) {
                    const [task] = plannerData.focusTasks.splice(idx, 1);
                    plannerData.archivedTasks.unshift(task);
                    syncFocusTasksToCalendar(); saveData(); renderFocusView();
                }
            } else if (t.classList.contains('btn-restore-task')) {
                const idx = plannerData.archivedTasks.findIndex(i => i.id === taskId);
                if (idx !== -1) {
                    const [task] = plannerData.archivedTasks.splice(idx, 1);
                    plannerData.focusTasks.push(task);
                    syncFocusTasksToCalendar(); saveData(); renderFocusView();
                }
            } else if (t.classList.contains('btn-sub-add')) {
                const task = plannerData.focusTasks.find(i => i.id === taskId);
                if (task) {
                    if (!task.subTasks) task.subTasks = [];
                    task.subTasks.push({ id: crypto.randomUUID(), title: '', todos: [] });
                    saveData(); renderFocusView();
                }
            } else if (t.classList.contains('btn-delete-sub')) {
                const task = plannerData.focusTasks.find(i => i.id === taskId);
                if (task && task.subTasks) {
                    const sIdx = task.subTasks.findIndex(s => s.id === subId);
                    if (sIdx !== -1) {
                        task.subTasks.splice(sIdx, 1);
                        syncFocusTasksToCalendar(); saveData(); renderFocusView();
                    }
                }
            } else if (t.classList.contains('btn-todo-add')) {
                const task = plannerData.focusTasks.find(i => i.id === taskId);
                if (task && task.subTasks) {
                    const sub = task.subTasks.find(s => s.id === subId);
                    if (sub) {
                        if (!sub.todos) sub.todos = [];
                        sub.todos.push({ id: crypto.randomUUID(), title: '', done: false });
                        saveData(); renderFocusView();
                    }
                }
            } else if (t.classList.contains('btn-delete-todo')) {
                const task = plannerData.focusTasks.find(i => i.id === taskId);
                if (task && task.subTasks) {
                    const sub = task.subTasks.find(s => s.id === subId);
                    if (sub && sub.todos) {
                        const tdIdx = sub.todos.findIndex(td => td.id === todoId);
                        if (tdIdx !== -1) {
                            sub.todos.splice(tdIdx, 1);
                            syncFocusTasksToCalendar(); saveData(); renderFocusView();
                        }
                    }
                }
            } else if (t.closest('.sync-item')) {
                const jumpId = t.closest('.sync-item').dataset.jumpTaskId;
                currentView = 'focus';
                elements.navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === 'focus'));
                renderActiveView();
                setTimeout(() => {
                    const targetCard = document.querySelector(`.task-row.task-level[data-task-id="${jumpId}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetCard.classList.add('jump-highlight');
                        setTimeout(() => targetCard.classList.remove('jump-highlight'), 3000);
                    }
                }, 100);
            }

            // Weekly View Interactions
            if (t.classList.contains('btn-weekly-add')) {
                const dateKey = t.dataset.date;
                const input = document.querySelector(`.weekly-item-add-input[data-date="${dateKey}"]`);
                addWeeklyItem(dateKey, input);
            } else if (t.classList.contains('btn-item-delete')) {
                const { date, idx } = t.dataset;
                const { userContent, syncedItems } = parseCellContent(date);
                const items = parseMarkdownList(userContent);
                if (confirm('Delete this item?')) {
                    items.splice(idx, 1);
                    updateWeeklyData(date, items, syncedItems);
                }
            } else if (t.classList.contains('btn-item-move')) {
                const { date, idx } = t.dataset;
                moveSourceDate = date; moveSourceIdx = parseInt(idx);
                elements.moveItemDatePicker.value = date;
                if (elements.moveItemDatePicker.showPicker) elements.moveItemDatePicker.showPicker();
                elements.moveItemDatePicker.click();
            }

            // Markdown Toggle Logic
            if (t.classList.contains('markdown-display')) {
                const parent = t.parentElement;
                const input = parent.querySelector('input[type="text"]');
                if (input && !input.disabled) {
                    t.classList.add('hidden-input');
                    input.classList.remove('hidden-input');
                    input.focus();
                }
            }
        });

        document.addEventListener('focusout', (e) => {
            const t = e.target;
            if (t.classList.contains('task-title-input') || t.classList.contains('sub-title-input') || t.classList.contains('todo-title-input')) {
                const parent = t.parentElement;
                const display = parent.querySelector('.markdown-display');
                if (display) {
                    t.classList.add('hidden-input');
                    display.classList.remove('hidden-input');
                    // Re-render markdown with new value
                    display.innerHTML = marked.parse(t.value || (t.classList.contains('task-title-input') ? 'Main Task Title...' : (t.classList.contains('sub-title-input') ? 'Sub-Task Title...' : 'What needs to be done?')));
                }
            }
        });

        const addWeeklyItem = (dateKey, input) => {
            const text = input.value.trim();
            if (!text) return;
            const { userContent, syncedItems } = parseCellContent(dateKey);
            const items = parseMarkdownList(userContent);
            items.push({ text, done: false });
            updateWeeklyData(dateKey, items, syncedItems);
            input.value = '';
        };

        const updateWeeklyData = (dateKey, items, syncedItems) => {
            const syncMarker = "[[FOCUS_SYNC_START]]";
            const newContent = serializeMarkdownList(items) + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
            plannerData.month[dateKey] = newContent.trim();
            saveData();
            renderActiveView();
        };

        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('weekly-item-add-input')) {
                addWeeklyItem(e.target.dataset.date, e.target);
            }
        });

        // Date Picker Move Listener
        elements.moveItemDatePicker.addEventListener('change', (e) => {
            const targetDate = e.target.value;
            if (targetDate && moveSourceDate && moveSourceIdx !== -1) {
                const { userContent, syncedItems } = parseCellContent(moveSourceDate);
                const items = parseMarkdownList(userContent);
                const [item] = items.splice(moveSourceIdx, 1);
                updateWeeklyData(moveSourceDate, items, syncedItems);

                const targetRes = parseCellContent(targetDate);
                const targetItems = parseMarkdownList(targetRes.userContent);
                targetItems.push(item);
                updateWeeklyData(targetDate, targetItems, targetRes.syncedItems);

                moveSourceDate = '';
                moveSourceIdx = -1;
                e.target.value = ''; // Reset for next move
            }
        });

        // Drag & Drop Listeners
        document.addEventListener('dragstart', (e) => {
            const item = e.target.closest('.weekly-item');
            if (item) {
                draggedItem = { date: item.dataset.date, idx: parseInt(item.dataset.idx) };
                item.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragover', (e) => {
            const dropZone = e.target.closest('[data-drop-zone="true"]');
            if (dropZone) {
                e.preventDefault();
                dropZone.classList.add('drag-over');
                e.dataTransfer.dropEffect = 'move';
            }
        });

        document.addEventListener('dragleave', (e) => {
            const dropZone = e.target.closest('[data-drop-zone="true"]');
            if (dropZone) dropZone.classList.remove('drag-over');
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('[data-drop-zone="true"]');
            if (dropZone && draggedItem) {
                const targetDate = dropZone.dataset.date;
                const sourceDate = draggedItem.date;
                const sourceIdx = draggedItem.idx;

                if (targetDate !== sourceDate) {
                    const { userContent, syncedItems } = parseCellContent(sourceDate);
                    const items = parseMarkdownList(userContent);
                    const [item] = items.splice(sourceIdx, 1);
                    updateWeeklyData(sourceDate, items, syncedItems);

                    const targetRes = parseCellContent(targetDate);
                    const targetItems = parseMarkdownList(targetRes.userContent);
                    targetItems.push(item);
                    updateWeeklyData(targetDate, targetItems, targetRes.syncedItems);
                }
            }
            if (dropZone) dropZone.classList.remove('drag-over');
        });

        document.addEventListener('dragend', (e) => {
            const item = e.target.closest('.weekly-item');
            if (item) item.classList.remove('dragging');
            draggedItem = null;
        });

        elements.exportBtn.addEventListener('click', async () => {
            const fileName = `planner_backup_${getTimestamp(new Date())}.json`;
            const content = JSON.stringify(plannerData, null, 2);

            // Attempt to use persisted directory handle first
            const dirHandle = await getHandle('exportFolder');
            if (dirHandle) {
                try {
                    if (await verifyPermission(dirHandle, true)) {
                        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
                        const writable = await fileHandle.createWritable();
                        await writable.write(content);
                        await writable.close();
                        alert(`Exported to your selected folder as ${fileName}`);
                        return;
                    }
                } catch (e) {
                    console.error("Failed to save to persisted folder", e);
                }
            }

            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{ description: 'JSON File', accept: { 'application/json': ['.json'] } }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(content);
                    await writable.close();
                    return;
                } catch (e) {
                    if (e.name === 'AbortError') return;
                    console.error("Save picker failed, falling back", e);
                }
            }

            // Fallback
            const blob = new Blob([content], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = fileName; a.click();
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

        if (elements.hideCompletedFocusBtn) {
            elements.hideCompletedFocusBtn.addEventListener('change', (e) => {
                plannerData.settings.hideCompletedFocusTasks = e.target.checked;
                saveData();
                renderFocusView();
            });
        }

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

        elements.setExportFolderBtn.addEventListener('click', async () => {
            try {
                const handle = await window.showDirectoryPicker();
                await storeHandle('exportFolder', handle);
                renderSettingsView();
                alert(`Export folder set to: ${handle.name}`);
            } catch (e) {
                if (e.name === 'AbortError') return;
                console.error("Folder picker failed", e);
                alert("Failed to select folder.");
            }
        });

        // Day To-Do list listeners
        const addDayTodo = () => {
            const text = elements.mainDayTodoInput.value.trim();
            if (!text) return;
            const dateKey = getDateKey(currentDate);

            // Add to Weekly/Monthly content (진행사항)
            const { userContent, syncedItems } = parseCellContent(dateKey);
            const items = parseMarkdownList(userContent);
            items.push({ text, done: false, progress: false });

            const syncMarker = "[[FOCUS_SYNC_START]]";
            const newContent = serializeMarkdownList(items) + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
            plannerData.month[dateKey] = newContent.trim();

            elements.mainDayTodoInput.value = '';
            saveData();
            renderDayView();
        };

        elements.addMainDayTodoBtn.addEventListener('click', addDayTodo);
        elements.mainDayTodoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addDayTodo();
        });

        const handleStatusToggle = (type, idOrIdx, dateOverride) => {
            const states = ['wait', 'progress', 'done'];
            if (type === 'focus-sub') {
                plannerData.focusTasks.forEach(task => {
                    (task.subTasks || []).forEach(sub => {
                        if (sub.id === idOrIdx) {
                            const currentStatus = sub.status || (sub.done ? 'done' : 'wait');
                            const nextStatus = states[(states.indexOf(currentStatus) + 1) % 3];
                            sub.status = nextStatus;
                            sub.done = (nextStatus === 'done');
                        }
                    });
                });
            } else if (type === 'weekly-todo') {
                const dateKey = dateOverride || getDateKey(currentDate);
                const { userContent, syncedItems } = parseCellContent(dateKey);
                const items = parseMarkdownList(userContent);
                const item = items[idOrIdx];

                const currentStatus = item.done ? 'done' : (item.progress ? 'progress' : 'wait');
                const nextStatus = states[(states.indexOf(currentStatus) + 1) % 3];

                item.done = (nextStatus === 'done');
                item.progress = (nextStatus === 'progress');

                const syncMarker = "[[FOCUS_SYNC_START]]";
                const newContent = serializeMarkdownList(items) + (syncedItems.length > 0 ? "\n\n" + syncMarker + "\n" + JSON.stringify(syncedItems) : "");
                plannerData.month[dateKey] = newContent.trim();
            }
            saveData();
            renderActiveView();
        };



        // Delegate status and memo clicks globally
        document.addEventListener('click', (e) => {
            const t = e.target;

            // Status Icon Toggle
            const statusIcon = t.closest('.status-icon');
            if (statusIcon) {
                const type = statusIcon.dataset.type;
                const isIdxType = type === 'weekly-todo';
                const idOrIdx = isIdxType ? parseInt(statusIcon.dataset.idx) : statusIcon.dataset.taskId;
                const dateOverride = statusIcon.dataset.date;
                handleStatusToggle(type, idOrIdx, dateOverride);
                return;
            }

            // Task Memo Toggle
            const memoBtn = t.closest('.btn-task-memo');
            if (memoBtn) {
                const type = memoBtn.dataset.type;
                const dateKey = memoBtn.dataset.date || getDateKey(currentDate);
                const idOrText = type === 'weekly-todo' ? memoBtn.dataset.text : memoBtn.dataset.taskId;

                currentMemoTarget = { type, idOrText, date: dateKey };

                let existingMemo = "";
                if (type === 'focus-sub') {
                    plannerData.focusTasks.forEach(task => {
                        (task.subTasks || []).forEach(sub => {
                            if (sub.id === idOrText) existingMemo = sub.memo || "";
                        });
                    });
                } else {
                    const dayData = plannerData.day[dateKey] || {};
                    if (dayData.itemMemos) existingMemo = dayData.itemMemos[idOrText] || "";
                }

                elements.taskMemoInput.value = existingMemo;
                elements.taskMemoTitle.textContent = `${type === 'focus-sub' ? '진행관련' : '진행사항'} Memo`;
                elements.taskMemoModal.classList.remove('hidden');
                elements.taskMemoInput.focus();
                return;
            }
        });

        // Task Memo Modal Listeners
        elements.closeTaskMemoModal.addEventListener('click', () => {
            elements.taskMemoModal.classList.add('hidden');
        });

        elements.saveTaskMemoBtn.addEventListener('click', () => {
            if (!currentMemoTarget) return;
            const content = elements.taskMemoInput.value.trim();
            const { type, idOrText, date } = currentMemoTarget;

            if (type === 'focus-sub') {
                plannerData.focusTasks.forEach(task => {
                    (task.subTasks || []).forEach(sub => {
                        if (sub.id === idOrText) sub.memo = content;
                    });
                });
            } else {
                if (!plannerData.day[date]) plannerData.day[date] = {};
                if (!plannerData.day[date].itemMemos) plannerData.day[date].itemMemos = {};
                plannerData.day[date].itemMemos[idOrText] = content;
            }

            saveData();
            renderDayView();
            elements.taskMemoModal.classList.add('hidden');
        });


        // Manual Save Button
        if (elements.saveDataBtn) {
            elements.saveDataBtn.addEventListener('click', () => {
                saveData();
                const originalText = elements.saveDataBtn.textContent;
                elements.saveDataBtn.textContent = "Saved!";
                elements.saveDataBtn.classList.add('success');
                setTimeout(() => {
                    elements.saveDataBtn.textContent = originalText;
                    elements.saveDataBtn.classList.remove('success');
                }, 2000);
            });
        }

        // GitHub Sync
        if (elements.syncBtn) {
            elements.syncBtn.addEventListener('click', syncWithGitHub);
        }

        if (elements.copyPlanBtn) {
            elements.copyPlanBtn.addEventListener('click', () => {
                const dk = getDateKey(currentDate);
                const dayEntry = plannerData.day[dk];
                if (!dayEntry || !dayEntry.activities) {
                    alert("No plans found for today to copy.");
                    return;
                }
                const planToCopy = {};
                Object.keys(dayEntry.activities).forEach(time => {
                    if (dayEntry.activities[time].plan) {
                        planToCopy[time] = dayEntry.activities[time].plan;
                    }
                });
                if (Object.keys(planToCopy).length === 0) {
                    alert("The Plan column is empty.");
                    return;
                }
                localStorage.setItem('antigravity_copied_plan', JSON.stringify(planToCopy));
                alert("Daily Plan copied! You can now go to another date and paste it.");
            });
        }

        if (elements.pastePlanBtn) {
            elements.pastePlanBtn.addEventListener('click', () => {
                const raw = localStorage.getItem('antigravity_copied_plan');
                if (!raw) {
                    alert("No copied plan found. Please copy one first.");
                    return;
                }
                const copiedPlan = JSON.parse(raw);
                const dk = getDateKey(currentDate);
                if (!plannerData.day[dk]) plannerData.day[dk] = { activities: {}, focus: {} };
                const dayEntry = plannerData.day[dk];
                if (!dayEntry.activities) dayEntry.activities = {};

                Object.keys(copiedPlan).forEach(time => {
                    if (!dayEntry.activities[time]) dayEntry.activities[time] = { plan: '', do: '' };
                    dayEntry.activities[time].plan = copiedPlan[time];
                });

                saveData();
                renderDayView();
                alert("Plan pasted!");
            });
        }

        // Network Status Listeners removed
    };

    let editingCardId = null;
    let editingEntryId = null;

    const renderMemoView = () => {
        const searchTerm = elements.memoSearch.value.toLowerCase();
        const categoryFilter = elements.memoFilterCategory.value;

        const filteredMemos = (plannerData.memos || []).filter(memo => {
            const matchesSearch = memo.title.toLowerCase().includes(searchTerm) ||
                memo.entries.some(e => e.text.toLowerCase().includes(searchTerm));
            const matchesCategory = categoryFilter === 'all' || memo.category === categoryFilter;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        // Dynamically update filter options
        const currentFilterValue = elements.memoFilterCategory.value;
        elements.memoFilterCategory.innerHTML = '<option value="all">All Categories</option>' +
            (plannerData.settings.memoCategories || []).map(cat => `<option value="${cat}">${cat}</option>`).join('');
        elements.memoFilterCategory.value = currentFilterValue;
        if (!elements.memoFilterCategory.value) elements.memoFilterCategory.value = 'all';

        elements.memoList.innerHTML = filteredMemos.map(memo => `
            <div class="memo-card" data-memo-id="${memo.id}">
                <div class="memo-card-header">
                    <h3 class="memo-title">${memo.title || 'Untitled'}</h3>
                    <div class="card-header-actions">
                        <button class="btn-add-entry" data-memo-id="${memo.id}" title="Add entry">+</button>
                        <button class="btn-memo-settings" data-memo-id="${memo.id}" title="Card settings">⚙</button>
                    </div>
                </div>
                <div class="memo-entries-list">
                    ${memo.entries.map(entry => `
                        <div class="entry-item" data-entry-id="${entry.id}">
                            <div class="entry-text">${entry.text.replace(/\n/g, '<br>')}<span class="memo-timestamp">${entry.timestamp}</span></div>
                            <div class="entry-actions">
                                <button class="btn-entry-edit" data-memo-id="${memo.id}" data-entry-id="${entry.id}" title="Edit entry">✎</button>
                                <button class="btn-entry-delete" data-memo-id="${memo.id}" data-entry-id="${entry.id}" title="Delete entry">×</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="memo-card-footer">
                    <span class="memo-category-badge cat-${memo.category}">${memo.category}</span>
                    <div class="memo-card-actions">
                        <span class="memo-date">${memo.date}</span>
                        <button class="btn-memo-delete" data-memo-id="${memo.id}" title="Delete entire card">Delete Card</button>
                    </div>
                </div>
            </div>
        `).join('') || '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">No memos found matching your criteria.</p>';
    };

    // Initialize Memo Data
    if (!plannerData.memos) plannerData.memos = [];

    // Memo Event Listeners
    elements.addMemoBtn.addEventListener('click', () => {
        editingCardId = null;
        elements.memoModalTitle.innerText = 'New Memo Card';
        elements.memoCategoryInput.innerHTML = (plannerData.settings.memoCategories || []).map(cat => `<option value="${cat}">${cat}</option>`).join('');
        elements.memoCategoryInput.value = (plannerData.settings.memoCategories && plannerData.settings.memoCategories.length > 0) ? plannerData.settings.memoCategories[0] : '';
        elements.memoTitleInput.value = '';
        elements.memoEditorModal.classList.remove('hidden');
    });

    elements.closeMemoModalBtn.addEventListener('click', () => {
        elements.memoEditorModal.classList.add('hidden');
    });

    elements.saveMemoBtn.addEventListener('click', () => {
        const title = elements.memoTitleInput.value.trim();
        const category = elements.memoCategoryInput.value;
        if (!title) return alert('Please enter a card title.');

        if (editingCardId) {
            const memo = plannerData.memos.find(m => m.id === editingCardId);
            if (memo) {
                memo.title = title;
                memo.category = category;
            }
        } else {
            const newCardId = crypto.randomUUID();
            plannerData.memos.push({
                id: newCardId,
                title: title,
                category: category,
                date: new Date().toLocaleDateString(),
                entries: []
            });
            // Automatically prompt for the first entry
            editingCardId = newCardId;
            editingEntryId = null;
            elements.entryModalTitle.innerText = 'Add First Entry';
            elements.entryContentInput.value = '';
            elements.entryEditorModal.classList.remove('hidden');
        }

        saveData();
        renderMemoView();
        elements.memoEditorModal.classList.add('hidden');
    });

    // Entry Modal Listeners
    elements.closeEntryModal.addEventListener('click', () => {
        elements.entryEditorModal.classList.add('hidden');
    });

    elements.saveEntryBtn.addEventListener('click', () => {
        const content = elements.entryContentInput.value.trim();
        if (!content) return alert('Please enter entry content.');

        const card = plannerData.memos.find(m => m.id === editingCardId);
        if (!card) return;

        const now = new Date();
        const timestamp = ` [${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;

        if (editingEntryId) {
            const entry = card.entries.find(e => e.id === editingEntryId);
            if (entry) {
                entry.text = content;
                entry.timestamp = timestamp;
            }
        } else {
            card.entries.push({
                id: crypto.randomUUID(),
                text: content,
                timestamp: timestamp
            });
        }

        saveData();
        renderMemoView();
        elements.entryEditorModal.classList.add('hidden');
    });

    elements.memoList.addEventListener('click', (e) => {
        const target = e.target;

        // Delete Entire Card
        const deleteCardBtn = target.closest('.btn-memo-delete');
        if (deleteCardBtn) {
            e.stopPropagation();
            const id = deleteCardBtn.dataset.memoId;
            if (confirm('Delete this entire memo card and all its entries?')) {
                plannerData.memos = plannerData.memos.filter(m => m.id !== id);
                saveData();
                renderMemoView();
            }
            return;
        }

        // Card Settings (Title/Category)
        const settingsBtn = target.closest('.btn-memo-settings');
        if (settingsBtn) {
            const id = settingsBtn.dataset.memoId;
            const memo = plannerData.memos.find(m => m.id === id);
            if (memo) {
                editingCardId = id;
                elements.memoModalTitle.innerText = 'Edit Memo Card Settings';
                elements.memoCategoryInput.innerHTML = (plannerData.settings.memoCategories || []).map(cat => `<option value="${cat}">${cat}</option>`).join('');
                elements.memoTitleInput.value = memo.title || '';
                elements.memoCategoryInput.value = memo.category;
                elements.memoEditorModal.classList.remove('hidden');
            }
            return;
        }

        // Add New Entry to Card
        const addEntryBtn = target.closest('.btn-add-entry');
        if (addEntryBtn) {
            editingCardId = addEntryBtn.dataset.memoId;
            editingEntryId = null;
            elements.entryModalTitle.innerText = 'Add New Entry';
            elements.entryContentInput.value = '';
            elements.entryEditorModal.classList.remove('hidden');
            return;
        }

        // Edit Individual Entry
        const editEntryBtn = target.closest('.btn-entry-edit');
        if (editEntryBtn) {
            editingCardId = editEntryBtn.dataset.memoId;
            editingEntryId = editEntryBtn.dataset.entryId;
            const card = plannerData.memos.find(m => m.id === editingCardId);
            const entry = card.entries.find(e => e.id === editingEntryId);
            if (entry) {
                elements.entryModalTitle.innerText = 'Edit Entry';
                elements.entryContentInput.value = entry.text;
                elements.entryEditorModal.classList.remove('hidden');
            }
            return;
        }

        // Delete Individual Entry
        const deleteEntryBtn = target.closest('.btn-entry-delete');
        if (deleteEntryBtn) {
            const mid = deleteEntryBtn.dataset.memoId;
            const eid = deleteEntryBtn.dataset.entryId;
            if (confirm('Delete this entry?')) {
                const card = plannerData.memos.find(m => m.id === mid);
                if (card) {
                    card.entries = card.entries.filter(e => e.id !== eid);
                    saveData();
                    renderMemoView();
                }
            }
            return;
        }
    });

    elements.memoSearch.addEventListener('input', renderMemoView);
    elements.memoFilterCategory.addEventListener('change', renderMemoView);

    // Category Management Listeners
    document.getElementById('add-category-btn')?.addEventListener('click', () => {
        if (!plannerData.settings.memoCategories) plannerData.settings.memoCategories = [];
        plannerData.settings.memoCategories.push('New Category');
        saveData();
        renderSettingsView();
    });

    document.getElementById('category-manager-container')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete-category')) {
            const idx = parseInt(e.target.closest('.category-item').dataset.idx);
            const catName = plannerData.settings.memoCategories[idx];
            if (confirm(`Delete category "${catName}"?`)) {
                plannerData.settings.memoCategories.splice(idx, 1);
                saveData();
                renderSettingsView();
            }
        }
    });

    document.getElementById('category-manager-container')?.addEventListener('change', (e) => {
        if (e.target.classList.contains('category-name-input')) {
            const idx = parseInt(e.target.closest('.category-item').dataset.idx);
            plannerData.settings.memoCategories[idx] = e.target.value.trim();
            saveData();
        }
    });

    init();
});
