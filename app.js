// State Management (Initially defined in database.js, then merged with localStorage)
let state = (typeof state !== 'undefined' && state) ? state : {
    waitList: [],
    mustRead: [],
    reading: [],
    completed: [],
    settings: {
        interestAuthors: ['히가시노 게이고', '단요', '성해나', '한강', '장용민', '허주은', '구병모', '정해연']
    },
    githubConfig: { user: '', repo: '', token: '' },
    currentView: 'dashboard'
};

// Filter Values
let filters = {
    author: '',
    year: '',
    month: '',
    group: '',
    class: ''
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initCharts();
    renderCurrentView();
    setupEventListeners();
    updateDate();
});

function updateDate() {
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString('ko-KR', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    });
}

// Navigation
function setupEventListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    document.querySelectorAll('.sidebar nav li').forEach(li => {
        li.addEventListener('click', () => {
            document.querySelectorAll('.sidebar nav li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            state.currentView = li.dataset.view;
            resetFilters(); // 필터 초기화
            renderCurrentView();

            // Mobile: Close sidebar after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // 필터 이벤트 리스너 추가
    document.getElementById('filter-author').addEventListener('change', (e) => {
        filters.author = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-group').addEventListener('change', (e) => {
        filters.group = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-class').addEventListener('input', (e) => {
        filters.class = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-year').addEventListener('change', (e) => {
        filters.year = e.target.value;
        renderCurrentView();
    });
    document.getElementById('filter-month').addEventListener('change', (e) => {
        filters.month = e.target.value;
        renderCurrentView();
    });

    // Modal logic
    const modal = document.getElementById('book-modal');
    document.getElementById('add-book-btn').addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addBookFromForm();
        modal.style.display = 'none';
        e.target.reset();
    });

    // Select Book Modal logic
    const selectModal = document.getElementById('select-book-modal');
    document.getElementById('close-select-modal').addEventListener('click', () => {
        selectModal.style.display = 'none';
    });
}

function resetFilters() {
    filters = { author: '', year: '', month: '', group: '', class: '' };
    document.getElementById('filter-author').value = '';
    document.getElementById('filter-year').value = '';
    document.getElementById('filter-month').value = '';
    document.getElementById('filter-group').value = '';
    document.getElementById('filter-class').value = '';
}

function updateFilterOptions(listName) {
    const filterAuthor = document.getElementById('filter-author');
    const filterYear = document.getElementById('filter-year');
    const filterMonth = document.getElementById('filter-month');

    const items = state[listName];
    const authors = [...new Set(items.map(b => b.author))].sort();

    // Extract years and months from publishDate or finishDate
    const dates = items.map(b => b.publishDate || b.finishDate).filter(d => d);
    const years = [...new Set(dates.map(d => d.split('-')[0]))].sort((a, b) => b - a);
    const months = [...new Set(dates.map(d => d.split('-')[1]))].sort((a, b) => a - b);

    const currentAuthor = filters.author;
    const currentYear = filters.year;
    const currentMonth = filters.month;

    filterAuthor.innerHTML = '<option value="">모든 작가</option>' +
        authors.map(a => `<option value="${a}" ${a === currentAuthor ? 'selected' : ''}>${a}</option>`).join('');

    filterYear.innerHTML = '<option value="">모든 년도</option>' +
        years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}년</option>`).join('');

    filterMonth.innerHTML = '<option value="">모든 월</option>' +
        months.map(m => `<option value="${m}" ${m === currentMonth ? 'selected' : ''}>${parseInt(m)}월</option>`).join('');
}

function renderCurrentView() {
    const views = ['dashboard-view', 'list-view', 'settings-view'];
    views.forEach(v => document.getElementById(v).style.display = 'none');

    const title = document.getElementById('view-title');

    switch (state.currentView) {
        case 'dashboard':
            document.getElementById('dashboard-view').style.display = 'block';
            title.textContent = '대시보드';
            renderDashboard();
            break;
        case 'to-read':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '대기도서목록';
            renderTable('waitList');
            break;
        case 'must-read':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '읽어야할도서';
            renderTable('mustRead');
            break;
        case 'reading':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '읽고있는도서';
            renderTable('reading');
            break;
        case 'completed':
            document.getElementById('list-view').style.display = 'block';
            title.textContent = '완독도서목록';
            renderTable('completed');
            break;
        case 'settings':
            document.getElementById('settings-view').style.display = 'block';
            title.textContent = '설정';
            renderSettings();
            break;
    }
}

// Data Handling
function addBookFromForm() {
    const book = {
        id: Date.now(),
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        publishDate: document.getElementById('book-date').value,
        classCode: document.getElementById('book-class').value,
        registeredAt: new Date().toISOString(),
        category: '기타'
    };

    book.category = categorizeBook(book);
    state.waitList.push(book);
    saveState();
    checkMustReadSlots();
    renderCurrentView();
}

function categorizeBook(book) {
    if (state.settings.interestAuthors.includes(book.author)) return '관심작가';
    const code = book.classCode;
    if (code.includes('물리학') || (parseFloat(code) >= 420 && parseFloat(code) < 430)) return '물리학';
    return '기타';
}

function checkMustReadSlots() {
    // 4 Slots: Philosophy(0,1,2,9), Science(3,4,5), Literature(8 authors else), Keigo(Keigo 8)
    if (!state.mustRead || state.mustRead.length === 0) {
        state.mustRead = [null, null, null, null];
    }
    saveState();
}

function openSelectBookModal(index) {
    const slots = [
        { name: '철학/역사 (000,100,200,900)', filter: b => ['0', '1', '2', '9'].includes(b.classCode[0]) },
        { name: '과학/기술 (300,400,500)', filter: b => ['3', '4', '5'].includes(b.classCode[0]) },
        { name: '문학 (기타 작가 800)', filter: b => b.classCode[0] === '8' && b.author !== '히가시노 게이고' },
        { name: '히가시노 게이고 (800)', filter: b => b.classCode[0] === '8' && b.author === '히가시노 게이고' }
    ];

    const slot = slots[index];
    const eligible = state.waitList.filter(slot.filter);

    document.getElementById('slot-info').textContent = `Slot: ${slot.name} | 선택 가능한 도서: ${eligible.length}권`;

    const container = document.getElementById('select-book-body');
    container.innerHTML = '';

    if (eligible.length === 0) {
        container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: var(--text-muted)">선택 가능한 도서가 없습니다.</td></tr>';
    } else {
        eligible.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publishDate}</td>
                <td>${book.classCode}</td>
                <td><button class="primary-btn" onclick="selectBookForSlot(${book.id}, ${index})">선택</button></td>
            `;
            container.appendChild(tr);
        });
    }

    document.getElementById('select-book-modal').style.display = 'flex';
}

function selectBookForSlot(bookId, slotIndex) {
    const bookIndex = state.waitList.findIndex(b => b.id === bookId);
    if (bookIndex === -1) return;

    // Handle existing book in slot
    if (state.mustRead[slotIndex]) {
        const existingBook = state.mustRead[slotIndex];
        // Remove slot-specific field before returning to waitList
        delete existingBook.slotGroup;
        state.waitList.push(existingBook);
    }

    const book = state.waitList.splice(bookIndex, 1)[0];
    const slots = [
        '철학/역사 (000,100,200,900)',
        '과학/기술 (300,400,500)',
        '문학 (기타 작가 800)',
        '히가시노 게이고 (800)'
    ];

    state.mustRead[slotIndex] = { ...book, slotGroup: slots[slotIndex] };

    document.getElementById('select-book-modal').style.display = 'none';
    saveState();
    renderCurrentView();
}


// Actions
function startReading(index) {
    const book = state.mustRead[index];
    if (!book) return;

    book.startDate = new Date().toISOString();
    state.reading.push(book);
    state.mustRead[index] = null;

    checkMustReadSlots();
    saveState();
    renderCurrentView();
}

function finishReading(id) {
    const index = state.reading.findIndex(b => b.id === id);
    if (index === -1) return;

    const book = state.reading.splice(index, 1)[0];
    book.finishDate = new Date().toISOString();
    book.reReadCount = book.reReadCount || 0;
    book.isReRead = book.isReRead || false;

    state.completed.push(book);
    saveState();
    renderCurrentView();
}

function handleReRead(id) {
    if (confirm("지금 재독 기록을 남기시겠습니까?")) {
        const index = state.completed.findIndex(b => b.id === id);
        if (index === -1) return;

        const book = { ...state.completed[index] };
        book.reReadCount = (book.reReadCount || 0) + 1;
        book.isReRead = true;
        book.startDate = new Date().toISOString();
        delete book.finishDate;

        state.reading.push(book);
        state.completed[index].reReadCount = book.reReadCount; // Update count in history too? OR just keep history.
        // The requirement says "복사됨" (copied), so we keep the old record and add to reading.

        saveState();
        renderCurrentView();
    }
}

// Rendering
function renderDashboard() {
    initCharts();
}

function renderTable(listName) {
    const container = document.getElementById('table-body');
    const header = document.getElementById('table-header');
    const filterUI = document.getElementById('table-filters');

    // 필터 UI 제어 (대기도서목록, 완독도서목록에서만 표시)
    const isFilterable = (listName === 'waitList' || listName === 'completed');
    filterUI.style.display = isFilterable ? 'flex' : 'none';

    // 도서 추가 버튼 제어 (읽어야할도서에서는 숨김)
    const addBookBtn = document.getElementById('add-book-btn');
    if (addBookBtn) {
        addBookBtn.style.display = (listName === 'mustRead' || listName === 'reading') ? 'none' : 'block';
    }


    if (isFilterable) {
        updateFilterOptions(listName);
    }

    container.innerHTML = '';

    const columns = {
        waitList: ['제목', '작가', '출판일', '분류번호', '카테고리', '등록일'],
        mustRead: ['그룹', '제목', '작가', '출판일', '분류번호', '작업'],
        reading: ['제목', '작가', '시작일', '작업'],
        completed: ['제목', '작가', '완독일', '재독횟수', '작업']
    };

    header.innerHTML = columns[listName].map(c => `<th>${c}</th>`).join('');

    let items = listName === 'mustRead' ? state.mustRead : state[listName];

    // 필터 적용
    if (isFilterable) {
        items = items.filter(book => {
            const matchAuthor = !filters.author || book.author === filters.author;
            const dateStr = book.publishDate || book.finishDate || "";
            const [year, month] = dateStr.split('-');

            const matchYear = !filters.year || year === filters.year;
            const matchMonth = !filters.month || month === filters.month;
            const matchClass = !filters.class || book.classCode.includes(filters.class);

            let matchGroup = true;
            if (filters.group) {
                const code = book.classCode[0];
                const author = book.author;
                switch (filters.group) {
                    case 'phil': matchGroup = ['0', '1', '2', '9'].includes(code); break;
                    case 'sci': matchGroup = ['3', '4', '5'].includes(code); break;
                    case 'keigo': matchGroup = author === '히가시노 게이고'; break;
                    case 'lit': matchGroup = code === '8' && author !== '히가시노 게이고'; break;
                }
            }
            return matchAuthor && matchYear && matchMonth && matchClass && matchGroup;
        });
    }

    items.forEach((book, index) => {
        const tr = document.createElement('tr');

        if (listName === 'mustRead' && !book) {
            const slotNames = [
                '철학/역사 (0,1,2,9)',
                '과학/기술 (3,4,5)',
                '문학 (기타 작가 800)',
                '히가시노 게이고 (800)'
            ];
            tr.innerHTML = `<td>${slotNames[index]}</td><td colspan="5" style="text-align:center; color:var(--text-muted)"><button class="primary-btn" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="openSelectBookModal(${index})">불러오기</button></td>`;
        } else if (book) {
            if (listName === 'waitList') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.publishDate}</td><td>${book.classCode}</td><td>${book.category}</td><td>${new Date(book.registeredAt).toLocaleDateString()}</td>`;
            } else if (listName === 'mustRead') {
                tr.innerHTML = `<td>${book.slotGroup}</td><td>${book.title}</td><td>${book.author}</td><td>${book.publishDate}</td><td>${book.classCode}</td><td>
                    <button class="primary-btn" onclick="startReading(${index})">읽기 시작</button>
                    <button class="primary-btn" style="background: var(--text-muted); margin-left: 0.5rem;" onclick="openSelectBookModal(${index})">변경</button>
                </td>`;
            } else if (listName === 'reading') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${new Date(book.startDate).toLocaleDateString()}</td><td><button class="primary-btn" onclick="finishReading(${book.id})">완료</button></td>`;
            } else if (listName === 'completed') {
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${new Date(book.finishDate).toLocaleDateString()}</td><td>${book.reReadCount || 0}</td><td><button class="primary-btn" style="background:var(--accent)" onclick="handleReRead(${book.id})">재독</button></td>`;
            }
        }
        container.appendChild(tr);
    });
}

function renderSettings() {
    const list = document.getElementById('interest-authors-list');
    list.innerHTML = '';
    state.settings.interestAuthors.forEach(author => {
        const li = document.createElement('li');
        li.textContent = author;
        list.appendChild(li);
    });

    document.getElementById('add-author-btn').onclick = () => {
        const name = document.getElementById('new-author').value;
        if (name) {
            state.settings.interestAuthors.push(name);
            document.getElementById('new-author').value = '';
            saveState();
            renderSettings();
        }
    };

    // 데이터 내보내기 (Export)
    document.getElementById('export-btn').onclick = () => {
        const dataStr = JSON.stringify(state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'antigravity_data.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // 데이터 가져오기 (Import)
    const fileInput = document.getElementById('import-file');
    document.getElementById('import-btn').onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedState = JSON.parse(event.target.result);
                if (confirm('데이터를 덮어쓰시겠습니까? 현재 기기의 기존 데이터는 사라집니다.')) {
                    state = importedState;
                    saveState();
                    location.reload(); // 리로드하여 전체 반영
                }
            } catch (err) {
                alert('잘못된 데이터 파일입니다.');
            }
        };
        reader.readAsText(file);
    };

    // GitHub 설정 저장
    const ghUser = document.getElementById('gh-user');
    const ghRepo = document.getElementById('gh-repo');
    const ghToken = document.getElementById('gh-token');

    if (ghUser) {
        // Ensure githubConfig exists
        if (!state.githubConfig) {
            state.githubConfig = { user: '', repo: '', token: '' };
        }
        ghUser.value = state.githubConfig.user || '';
        ghRepo.value = state.githubConfig.repo || '';
        ghToken.value = state.githubConfig.token || '';

        document.getElementById('save-gh-config-btn').onclick = () => {
            state.githubConfig.user = ghUser.value.trim();
            state.githubConfig.repo = ghRepo.value.trim();
            state.githubConfig.token = ghToken.value.trim();
            saveState();
            alert('GitHub 설정이 이 브라우저에 저장되었습니다.');
        };
    }

    // GitHub 자동 동기화 버튼
    const syncBtn = document.getElementById('sync-github-btn');
    if (syncBtn) {
        syncBtn.onclick = () => syncWithGitHub();
    }

    // GitHub 업데이트 코드 복사
    const copyBtn = document.getElementById('copy-github-code-btn');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const stateCode = generateStateCode();
            navigator.clipboard.writeText(stateCode).then(() => {
                alert('GitHub app.js에 덮어쓸 코드가 복사되었습니다!\nGitHub에서 state 변수 부분을 이 코드로 교체하세요.');
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('코드 복사에 실패했습니다.');
            });
        };
    }
}

async function syncWithGitHub() {
    const ghUser = document.getElementById('gh-user');
    const ghRepo = document.getElementById('gh-repo');
    const ghToken = document.getElementById('gh-token');
    const statusEl = document.getElementById('sync-status');

    // Ensure githubConfig exists
    if (!state.githubConfig) {
        state.githubConfig = { user: '', repo: '', token: '' };
    }

    // Read from fields directly in case they weren't saved yet
    const user = ghUser ? ghUser.value.trim() : state.githubConfig.user;
    const repo = ghRepo ? ghRepo.value.trim() : state.githubConfig.repo;
    const token = ghToken ? ghToken.value.trim() : state.githubConfig.token;

    if (!user || !repo || !token) {
        alert('GitHub 설정을 먼저 완료해 주세요 (사용자명, 저장소명, 토큰 입력 필수).');
        return;
    }

    if (!confirm('현재 데이터를 GitHub에 즉시 업데이트하시겠습니까?')) return;

    statusEl.textContent = 'GitHub 연결 중...';
    statusEl.style.color = 'var(--text-muted)';
    const filePath = 'database.js';
    const url = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}`;

    try {
        // 1. Get current file data (to get SHA)
        console.log('Fetching SHA from:', url);
        const getRes = await fetch(url, {
            headers: { 'Authorization': `token ${token}` }
        });

        if (!getRes.ok) {
            let errorMsg = '파일 정보를 가져오지 못했습니다.';
            if (getRes.status === 401) errorMsg = '토큰이 유효하지 않습니다 (401 Unauthorized).';
            else if (getRes.status === 403) errorMsg = 'API 호출 한도 초과 또는 권한 부족 (403 Forbidden). 토큰에 repo 권한이 있는지 확인하세요.';
            else if (getRes.status === 404) errorMsg = `파일을 찾을 수 없습니다 (404 Not Found). 저장소 이름(${repo})과 경로(database.js)가 정확한지 확인하세요.`;
            throw new Error(`${errorMsg} (Status: ${getRes.status})`);
        }

        const fileData = await getRes.json();
        const sha = fileData.sha;

        // 2. Generate new content
        statusEl.textContent = '업데이트 준비 중...';
        const newCode = generateStateCode();

        // UTF-8 to Base64 (Reliable version)
        const utf8Encoder = new TextEncoder();
        const bytes = utf8Encoder.encode(newCode);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        const encodedContent = btoa(binString);

        // 3. Update file via API
        statusEl.textContent = 'GitHub로 전송 중...';
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update database from browser (${new Date().toLocaleString()})`,
                content: encodedContent,
                sha: sha
            })
        });

        if (putRes.ok) {
            statusEl.textContent = '✅ 동기화 완료!';
            statusEl.style.color = 'var(--primary-color)';
            alert('성공! GitHub의 데이터가 최신 상태로 업데이트되었습니다.');
        } else {
            const errData = await putRes.json();
            throw new Error(errData.message || '업데이트 요청 실패');
        }
    } catch (err) {
        console.error('동기화 에러:', err);
        statusEl.textContent = '❌ 동기화 실패';
        statusEl.style.color = 'var(--accent)';
        alert('동기화 실패:\n' + err.message);
    }
}

function generateStateCode() {
    // UI 상태 등 불필요하거나 민감한 값 제외/초기화 (database.js 용)
    const cleanState = { ...state };

    // 브라우저 상태 등의 구조는 유지하되 초기값/빈값으로 전송
    cleanState.currentView = 'dashboard';
    cleanState.githubConfig = {
        user: '',
        repo: '',
        token: ''
    };

    const jsonStr = JSON.stringify(cleanState, null, 4);
    return `// Antigravity Reading App - Database\nlet state = ${jsonStr};`;
}


let yearlyChart = null;
let groupChart = null;
let authorChart = null;

function initCharts() {
    const yearlyEl = document.getElementById('yearlyChart');
    const groupEl = document.getElementById('groupChart');
    const authorEl = document.getElementById('authorChart');

    if (!yearlyEl || !groupEl || !authorEl) return;

    const yearlyCtx = yearlyEl.getContext('2d');
    const groupCtx = groupEl.getContext('2d');
    const authorCtx = authorEl.getContext('2d');

    // 1. Yearly Data
    const yearlyData = {};
    state.completed.forEach(b => {
        if (b.finishDate) {
            const year = new Date(b.finishDate).getFullYear();
            yearlyData[year] = (yearlyData[year] || 0) + 1;
        }
    });

    if (yearlyChart) yearlyChart.destroy();
    yearlyChart = new Chart(yearlyCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(yearlyData),
            datasets: [{
                label: '권수',
                data: Object.values(yearlyData),
                backgroundColor: '#6366f1',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });

    // 2. Group Data
    const groupData = { '철학/역사': 0, '과학/기술': 0, '문학': 0, '히가시노': 0 };
    state.completed.forEach(b => {
        const code = (b.classCode && b.classCode.length > 0) ? b.classCode[0] : '8';
        if (['0', '1', '2', '9'].includes(code)) groupData['철학/역사']++;
        else if (['3', '4', '5'].includes(code)) groupData['과학/기술']++;
        else if (code === '8') {
            if (b.author === '히가시노 게이고') groupData['히가시노']++;
            else groupData['문학']++;
        }
    });

    if (groupChart) groupChart.destroy();
    groupChart = new Chart(groupCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(groupData),
            datasets: [{
                data: Object.values(groupData),
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
                borderWidth: 0
            }]
        },
        options: { cutout: '70%', responsive: true, maintainAspectRatio: false }
    });

    // 3. Author Treemap (Robust Version)
    const authorCounts = {};
    state.completed.forEach(b => {
        if (b.author && state.settings.interestAuthors.includes(b.author)) {
            authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
        }
    });

    const treemapData = Object.entries(authorCounts).map(([author, count]) => ({
        authorName: author,
        count: count
    }));

    if (authorChart) authorChart.destroy();

    if (treemapData.length === 0) {
        // 데이터가 없는 경우를 대비한 가상 데이터나 처리
        authorChart = null;
        return;
    }

    authorChart = new Chart(authorCtx, {
        type: 'treemap',
        data: {
            datasets: [{
                tree: treemapData,
                key: 'count',
                groups: ['authorName'],
                spacing: 2,
                borderRadius: 12,
                backgroundColor: (ctx) => {
                    const colors = [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(244, 63, 94, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(14, 165, 233, 0.8)'
                    ];
                    return colors[ctx.dataIndex % colors.length] || colors[0];
                },
                labels: {
                    display: true,
                    formatter: (ctx) => {
                        if (ctx.type !== 'data' || !ctx.raw) return '';
                        // v2.3.0에서는 ctx.raw.g가 그룹 이름을 가질 수 있음
                        return [ctx.raw.g, ctx.raw.v + '권'];
                    },
                    font: { size: 14, weight: '700', family: 'Outfit' },
                    color: '#ffffff'
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const name = ctx.raw.g || '알 수 없음';
                            const value = ctx.raw.v || 0;
                            return ` ${name}: ${value}권 완독`;
                        }
                    }
                }
            }
        }
    });
}

function saveState() {
    localStorage.setItem('antigravity_state', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('antigravity_state');
    if (saved) {
        const parsed = JSON.parse(saved);

        // Ensure all hardcoded items are present (Merge by ID)
        const hardcodedCompleted = state.completed;
        const hardcodedWaitList = state.waitList;

        // Merge Completed
        hardcodedCompleted.forEach(hBook => {
            if (!parsed.completed.find(b => b.id === hBook.id)) {
                parsed.completed.push(hBook);
            }
        });

        // Merge WaitList
        hardcodedWaitList.forEach(hBook => {
            if (!parsed.waitList.find(b => b.id === hBook.id) &&
                !parsed.reading.find(b => b.id === hBook.id) &&
                !parsed.completed.find(b => b.id === hBook.id) &&
                !(parsed.mustRead || []).find(b => b && b.id === hBook.id)) {
                parsed.waitList.push(hBook);
            }
        });

        // Merge Reading
        state.reading.forEach(rBook => {
            if (!parsed.reading.find(b => b.id === rBook.id) &&
                !parsed.completed.find(b => b.id === rBook.id)) {
                parsed.reading.push(rBook);
                // Remove from waitList if it was there
                parsed.waitList = parsed.waitList.filter(b => b.id !== rBook.id);
            }
        });

        // Ensure base structure exists with fallbacks (Resilient merging)
        parsed.currentView = parsed.currentView || state.currentView || 'dashboard';
        parsed.settings = parsed.settings || state.settings || { interestAuthors: [] };
        parsed.githubConfig = parsed.githubConfig || state.githubConfig || { user: '', repo: '', token: '' };

        state = parsed;
    } else {
        // LocalStorage가 없더라도 기본 state 구조 보장
        if (!state.currentView) state.currentView = 'dashboard';
        if (!state.githubConfig) state.githubConfig = { user: '', repo: '', token: '' };
    }

    // Check MustRead slots
    checkMustReadSlots();
    // Save the merged state back to ensure it persists
    saveState();
}
