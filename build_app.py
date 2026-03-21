#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build updated bookshelf index.html"""
import json, re

with open(r'C:\Users\bate9\OneDrive\antigravity-projects\bookshelf\index.html', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'const INITIAL_BOOKS = (\[.*?\]);', content, re.DOTALL)
books = json.loads(m.group(1))
books_js = json.dumps(books, ensure_ascii=False)

html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>내 서재 📚</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
:root {{
  --primary: #1e3a5f; --primary-light: #2d5282; --accent: #f6820c; --accent-light: #fef3e2;
  --green: #16a34a; --green-light: #dcfce7; --blue: #2563eb; --blue-light: #dbeafe;
  --orange: #ea580c; --orange-light: #fff7ed;
  --danger: #dc2626; --danger-light: #fee2e2; --purple: #7c3aed; --purple-light: #ede9fe;
  --reading-color: #d97706; --reading-bg: #fef3c7;
  --bg: #f1f5f9; --surface: #ffffff; --surface2: #f8fafc;
  --border: #e2e8f0; --border-hover: #cbd5e1;
  --text: #0f172a; --text-secondary: #475569; --text-muted: #94a3b8;
  --sidebar-w: 230px;
  --radius: 12px; --radius-sm: 8px; --radius-xs: 6px;
  --shadow: 0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,.07),0 2px 4px -1px rgba(0,0,0,.04);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
  --tr: .18s ease;
}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
html{{scroll-behavior:smooth}}
body{{font-family:'Noto Sans KR',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}}
a{{text-decoration:none;color:inherit;cursor:pointer}}
button{{cursor:pointer;font-family:inherit;border:none;background:none}}
input,select,textarea{{font-family:inherit;font-size:14px}}
svg{{fill:currentColor;display:block;flex-shrink:0}}

/* Layout */
.sidebar{{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:var(--primary);display:flex;flex-direction:column;z-index:200;transition:transform var(--tr);overflow-y:auto}}
.main-wrapper{{margin-left:var(--sidebar-w);min-height:100vh;display:flex;flex-direction:column}}
.main-content{{flex:1;padding:24px;max-width:1400px;width:100%}}

/* Sidebar */
.sidebar-brand{{display:flex;align-items:center;gap:10px;padding:22px 20px 18px;border-bottom:1px solid rgba(255,255,255,.1);flex-shrink:0}}
.brand-icon{{font-size:26px}}.brand-name{{font-size:18px;font-weight:700;color:#fff;letter-spacing:-.3px}}
.sidebar-nav{{flex:1;padding:12px 0}}
.nav-item{{display:flex;align-items:center;gap:10px;padding:11px 20px;color:rgba(255,255,255,.7);font-size:14px;font-weight:500;transition:all var(--tr);cursor:pointer;position:relative}}
.nav-item:hover{{background:rgba(255,255,255,.08);color:#fff}}
.nav-item.active{{background:rgba(255,255,255,.15);color:#fff;font-weight:600}}
.nav-item.active::before{{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);border-radius:0 3px 3px 0}}
.nav-item svg{{width:18px;height:18px;flex-shrink:0}}
.nav-badge{{margin-left:auto;background:var(--accent);color:#fff;font-size:11px;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}}
.sidebar-footer{{padding:16px;border-top:1px solid rgba(255,255,255,.1)}}
.btn-add-sidebar{{width:100%;display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:var(--radius-sm);background:var(--accent);color:#fff;font-size:14px;font-weight:600;transition:all var(--tr)}}
.btn-add-sidebar:hover{{background:#d97706;transform:translateY(-1px)}}
.btn-add-sidebar svg{{width:18px;height:18px}}
.sidebar-overlay{{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:199}}

/* Topbar */
.topbar{{display:flex;align-items:center;gap:12px;padding:14px 24px;background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;box-shadow:var(--shadow)}}
.menu-btn{{display:none;width:36px;height:36px;align-items:center;justify-content:center;border-radius:var(--radius-sm);color:var(--text-secondary);flex-shrink:0}}
.menu-btn:hover{{background:var(--bg)}}.menu-btn svg{{width:22px;height:22px}}
.topbar-title{{font-size:18px;font-weight:700;color:var(--text)}}
.topbar-actions{{margin-left:auto;display:flex;align-items:center;gap:8px}}
.btn-topbar{{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:var(--radius-sm);font-size:13px;font-weight:600;transition:all var(--tr)}}
.btn-topbar-primary{{background:var(--primary);color:#fff}}.btn-topbar-primary:hover{{background:var(--primary-light)}}
.btn-topbar-outline{{background:transparent;color:var(--text-secondary);border:1px solid var(--border)}}.btn-topbar-outline:hover{{background:var(--bg);border-color:var(--border-hover)}}
.btn-topbar-icon{{background:transparent;color:var(--text-secondary);border:1px solid var(--border)}}.btn-topbar-icon:hover{{background:var(--bg);border-color:var(--border-hover);color:var(--text)}}
.topbar-divider{{width:1px;height:22px;background:var(--border);flex-shrink:0}}
.btn-topbar svg{{width:16px;height:16px}}

/* Views */
.view{{display:none}}.view.active{{display:block}}

/* Active Reading Section */
.active-reading-section{{margin-bottom:20px}}
.active-reading-header{{font-size:15px;font-weight:600;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:8px}}
.active-reading-cards{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}}
.active-reading-card{{background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius);padding:16px;border-left:4px solid var(--reading-color);display:flex;flex-direction:column;gap:6px}}
.active-reading-title{{font-weight:700;font-size:14px;color:var(--text);line-height:1.4;word-break:keep-all}}
.active-reading-author{{font-size:12px;color:var(--text-secondary)}}
.active-reading-days{{font-size:13px;font-weight:700;color:var(--reading-color);margin-top:4px}}
.active-reading-started{{font-size:11px;color:var(--text-muted);margin-top:2px}}

/* Dashboard */
.stat-grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}}
.stat-card{{background:var(--surface);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);display:flex;align-items:center;gap:16px;cursor:pointer;transition:all var(--tr);border:1px solid var(--border)}}
.stat-card:hover{{transform:translateY(-2px);box-shadow:var(--shadow-md)}}
.stat-icon{{width:48px;height:48px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}}
.stat-icon.blue{{background:var(--blue-light)}}.stat-icon.green{{background:var(--green-light)}}
.stat-icon.orange{{background:var(--reading-bg)}}.stat-icon.purple{{background:var(--purple-light)}}
.stat-icon.yellow{{background:var(--accent-light)}}
.stat-value{{font-size:28px;font-weight:700;color:var(--text);line-height:1}}
.stat-label{{font-size:12px;color:var(--text-muted);margin-top:4px;font-weight:500}}
.charts-grid{{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}}
.chart-card{{background:var(--surface);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);border:1px solid var(--border)}}
.chart-card.wide{{grid-column:span 2}}
.chart-title{{font-size:15px;font-weight:600;color:var(--text);margin-bottom:16px}}
.chart-wrap{{height:200px;position:relative}}.chart-wrap.tall{{height:300px}}
.recent-card{{background:var(--surface);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);border:1px solid var(--border)}}
.recent-item{{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)}}
.recent-item:last-child{{border-bottom:none}}
.recent-rank{{width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}}
.recent-rank.gold{{background:#d97706}}.recent-rank.silver{{background:#64748b}}.recent-rank.bronze{{background:#b45309}}
.recent-info{{flex:1;min-width:0}}
.recent-title{{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.recent-author{{font-size:12px;color:var(--text-muted);margin-top:1px}}
.recent-date{{font-size:12px;color:var(--text-secondary);flex-shrink:0}}

/* Filters */
.filters-bar{{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;background:var(--surface);border-radius:var(--radius-sm);padding:14px 16px;border:1px solid var(--border);box-shadow:var(--shadow)}}
.filter-input,.filter-select{{border:1px solid var(--border);border-radius:var(--radius-sm);padding:7px 12px;background:var(--bg);color:var(--text);outline:none;transition:border-color var(--tr)}}
.filter-input:focus,.filter-select:focus{{border-color:var(--primary-light)}}
.filter-input.search-box{{min-width:220px}}
.filters-count{{margin-left:auto;font-size:13px;color:var(--text-muted);font-weight:500;white-space:nowrap}}

/* Table */
.table-container{{background:var(--surface);border-radius:var(--radius);box-shadow:var(--shadow);border:1px solid var(--border);overflow:hidden}}
.table-scroll{{overflow-x:auto}}
table{{width:100%;border-collapse:collapse}}
thead tr{{background:var(--surface2)}}
th{{padding:12px 14px;text-align:left;font-size:12px;font-weight:600;color:var(--text-secondary);border-bottom:1px solid var(--border);letter-spacing:.3px;text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap}}
th:hover{{color:var(--primary)}}
th.sorted-asc::after{{content:" ▲";font-size:10px}}th.sorted-desc::after{{content:" ▼";font-size:10px}}
th.no-sort{{cursor:default}}th.no-sort:hover{{color:var(--text-secondary)}}
td{{padding:11px 14px;border-bottom:1px solid var(--border);font-size:13px;color:var(--text);vertical-align:middle}}
tr:last-child td{{border-bottom:none}}
tr:hover td{{background:var(--surface2)}}
tr.row-reading td{{background:#fffbeb}}
tr.row-reading:hover td{{background:#fef3c7}}
.td-title{{max-width:300px;white-space:normal;word-break:keep-all;line-height:1.4;font-weight:500}}
.td-author{{max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}
.td-publish,.td-completion-date{{color:var(--text-secondary);white-space:nowrap}}
.completed-check{{width:18px;height:18px;cursor:pointer;accent-color:var(--green)}}

/* Reading status badge */
.reading-badge{{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;background:var(--reading-bg);color:var(--reading-color);border:1px solid #fde68a}}
.btn-reading-toggle{{display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:var(--radius-xs);font-size:11px;font-weight:600;background:var(--reading-bg);color:var(--reading-color);border:1px solid #fde68a;cursor:pointer;transition:all var(--tr);white-space:nowrap}}
.btn-reading-toggle:hover{{background:#fde68a}}
.btn-reading-toggle.active{{background:var(--reading-color);color:#fff;border-color:var(--reading-color)}}

/* Genre badges */
.genre-badge{{display:inline-flex;align-items:center;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}}
.genre-문학{{background:#dbeafe;color:#1d4ed8}}.genre-자연과학{{background:#dcfce7;color:#15803d}}
.genre-철학{{background:#ede9fe;color:#6d28d9}}.genre-사회과학{{background:#fef3c7;color:#92400e}}
.genre-역사{{background:#fee2e2;color:#b91c1c}}.genre-총류{{background:#f1f5f9;color:#475569}}
.genre-기술과학{{background:#ecfdf5;color:#065f46}}.genre-예술{{background:#fdf2f8;color:#9d174d}}
.genre-언어{{background:#fff7ed;color:#c2410c}}.genre-종교{{background:#f5f3ff;color:#5b21b6}}
.genre-기타{{background:#f1f5f9;color:#475569}}

/* Table actions */
.td-actions{{display:flex;align-items:center;gap:4px;white-space:nowrap}}
.btn-edit-row,.btn-delete-row{{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:var(--radius-xs);font-size:12px;font-weight:600;background:var(--bg);color:var(--text-secondary);border:1px solid var(--border);transition:all var(--tr)}}
.btn-edit-row:hover{{background:var(--primary);color:#fff;border-color:var(--primary)}}
.btn-delete-row:hover{{background:var(--danger);color:#fff;border-color:var(--danger)}}

/* Reading list cards */
.reading-order-list{{display:flex;flex-direction:column;gap:8px}}
.reading-item{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px 16px;display:flex;align-items:center;gap:12px;box-shadow:var(--shadow);transition:all var(--tr)}}
.reading-item:hover{{border-color:var(--border-hover)}}
.reading-item.item-reading{{border-left:3px solid var(--reading-color);background:#fffbeb}}
.reading-item-badge{{flex-shrink:0}}
.reading-info{{flex:1;min-width:0}}
.reading-title{{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.reading-sub{{font-size:12px;color:var(--text-muted);margin-top:2px}}
.reading-actions{{display:flex;gap:6px;flex-shrink:0}}

/* Book cards */
.books-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}}
.book-card{{background:var(--surface);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow);border:1px solid var(--border);transition:all var(--tr);display:flex;flex-direction:column;gap:8px}}
.book-card:hover{{transform:translateY(-2px);box-shadow:var(--shadow-md)}}
.book-title{{font-weight:700;font-size:14px;line-height:1.4;color:var(--text);word-break:keep-all}}
.book-author{{font-size:12px;color:var(--text-muted)}}
.book-meta{{display:flex;align-items:center;gap:8px;flex-wrap:wrap}}
.book-date-badge{{font-size:11px;color:var(--text-secondary);background:var(--surface2);padding:2px 7px;border-radius:12px;border:1px solid var(--border)}}
.book-card-footer{{display:flex;align-items:center;justify-content:flex-end;gap:6px;margin-top:auto}}
.btn-card-action{{padding:5px 10px;border-radius:var(--radius-xs);font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;background:var(--bg);color:var(--text-secondary);border:1px solid var(--border);transition:all var(--tr)}}
.btn-card-action:hover{{background:var(--primary);color:#fff;border-color:var(--primary)}}
.btn-card-complete:hover{{background:var(--green)!important;border-color:var(--green)!important}}
.btn-card-delete:hover{{background:var(--danger)!important;border-color:var(--danger)!important}}

/* Empty state */
.empty-state{{text-align:center;padding:60px 20px;background:var(--surface);border-radius:var(--radius);border:1px solid var(--border);box-shadow:var(--shadow)}}
.empty-icon{{font-size:48px;margin-bottom:12px}}
.empty-state h3{{font-size:16px;font-weight:700;color:var(--text);margin-bottom:6px}}
.empty-state p{{color:var(--text-muted);font-size:13px}}

/* Settings */
.settings-section{{background:var(--surface);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow);border:1px solid var(--border);margin-bottom:20px}}
.settings-section-title{{font-size:16px;font-weight:700;color:var(--text);margin-bottom:6px;display:flex;align-items:center;gap:8px}}
.settings-section-desc{{font-size:13px;color:var(--text-secondary);margin-bottom:20px;line-height:1.6}}
.genre-list{{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}}
.genre-item{{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm)}}
.genre-item-name{{flex:1;font-size:14px;font-weight:500}}
.genre-item-count{{font-size:12px;color:var(--text-muted);margin-right:4px}}
.genre-add-row{{display:flex;gap:8px}}
.genre-edit-input{{flex:1;border:1px solid var(--border);border-radius:var(--radius-sm);padding:8px 12px;background:var(--bg);color:var(--text);outline:none;font-size:14px}}
.genre-edit-input:focus{{border-color:var(--primary-light)}}
.backup-actions{{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}}
.backup-folder-row{{display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap}}
.backup-folder-display{{flex:1;padding:8px 12px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);min-width:200px;font-family:monospace}}
.info-box{{background:var(--blue-light);border:1px solid #bfdbfe;border-radius:var(--radius-sm);padding:12px 14px;font-size:12px;color:#1e40af;line-height:1.6}}
.info-box strong{{font-weight:600}}

/* Modal */
.modal{{display:none;position:fixed;inset:0;z-index:1000;overflow-y:auto;background:rgba(0,0,0,.5);padding:20px;align-items:flex-start;justify-content:center}}
.modal.open{{display:flex}}
.modal-box{{background:var(--surface);border-radius:var(--radius);width:100%;max-width:500px;box-shadow:var(--shadow-lg);margin:auto;animation:slideUp .25s ease}}
@keyframes slideUp{{from{{opacity:0;transform:translateY(20px)}}to{{opacity:1;transform:translateY(0)}}}}
.modal-header{{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border)}}
.modal-title{{font-size:16px;font-weight:700}}
.modal-close{{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:var(--text-secondary);transition:all var(--tr)}}
.modal-close:hover{{background:var(--bg);color:var(--text)}}.modal-close svg{{width:18px;height:18px}}
.modal-body{{padding:20px}}.modal-footer{{display:flex;gap:10px;justify-content:flex-end;padding:16px 20px;border-top:1px solid var(--border)}}
.form-group{{margin-bottom:16px}}
.form-label{{display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:var(--text-secondary)}}
.form-control{{width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg);color:var(--text);outline:none;transition:border-color var(--tr)}}
.form-control:focus{{border-color:var(--primary-light)}}
.form-row{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}

/* Buttons */
.btn{{padding:9px 18px;border-radius:var(--radius-sm);font-size:14px;font-weight:600;transition:all var(--tr);display:inline-flex;align-items:center;gap:6px}}
.btn-primary{{background:var(--primary);color:#fff}}.btn-primary:hover{{background:var(--primary-light)}}
.btn-secondary{{background:transparent;color:var(--text-secondary);border:1px solid var(--border)}}.btn-secondary:hover{{background:var(--bg)}}
.btn-danger{{background:var(--danger);color:#fff}}.btn-danger:hover{{background:#b91c1c}}
.btn-success{{background:var(--green);color:#fff}}.btn-success:hover{{background:#15803d}}
.btn-sm{{padding:6px 12px;font-size:12px}}
.btn:disabled{{opacity:.6;cursor:not-allowed}}
.confirm-icon{{text-align:center;font-size:40px;margin-bottom:12px}}
.confirm-msg{{text-align:center;font-size:14px;color:var(--text-secondary)}}
.confirm-book-name{{font-weight:700;color:var(--text);display:block;margin-top:6px}}

/* Toast */
.toast{{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--text);color:#fff;padding:10px 20px;border-radius:24px;font-size:13px;font-weight:500;z-index:9999;transition:transform .3s ease,opacity .3s ease;opacity:0;box-shadow:var(--shadow-lg);white-space:nowrap}}
.toast.show{{transform:translateX(-50%) translateY(0);opacity:1}}

/* Tab bar for reading list */
.tab-bar{{display:flex;gap:0;margin-bottom:16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:4px;box-shadow:var(--shadow)}}
.tab-btn{{flex:1;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;color:var(--text-secondary);transition:all var(--tr);text-align:center;cursor:pointer}}
.tab-btn.active{{background:var(--primary);color:#fff}}
.tab-btn:not(.active):hover{{background:var(--surface2)}}

/* Scrollbar */
::-webkit-scrollbar{{width:6px;height:6px}}
::-webkit-scrollbar-track{{background:transparent}}
::-webkit-scrollbar-thumb{{background:#cbd5e1;border-radius:3px}}
::-webkit-scrollbar-thumb:hover{{background:#94a3b8}}

/* Responsive */
@media(max-width:1024px){{.stat-grid{{grid-template-columns:repeat(2,1fr)}}.charts-grid{{grid-template-columns:1fr}}.chart-card.wide{{grid-column:span 1}}}}
@media(max-width:768px){{
  .sidebar{{transform:translateX(-100%)}}.sidebar.open{{transform:translateX(0)}}
  .sidebar-overlay{{display:block;opacity:0;pointer-events:none;transition:opacity var(--tr)}}.sidebar-overlay.open{{opacity:1;pointer-events:all}}
  .main-wrapper{{margin-left:0}}.menu-btn{{display:flex}}
  .main-content{{padding:16px}}.topbar{{padding:12px 16px}}
  .stat-grid{{grid-template-columns:repeat(2,1fr);gap:10px}}.stat-card{{padding:14px}}.stat-value{{font-size:22px}}
  .books-grid{{grid-template-columns:1fr}}.form-row{{grid-template-columns:1fr}}
  .filters-bar{{flex-direction:column;align-items:stretch}}.filter-input.search-box{{min-width:0;width:100%}}
  .modal{{padding:10px}}.topbar-title{{font-size:15px}}.btn-topbar span{{display:none}}.topbar-divider{{display:none}}
  .tab-bar{{margin-bottom:12px}}
}}
  </style>
</head>
<body>

<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <span class="brand-icon">📚</span>
    <span class="brand-name">내 서재</span>
  </div>
  <nav class="sidebar-nav">
    <a class="nav-item active" data-view="dashboard">
      <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
      <span>대시보드</span>
    </a>
    <a class="nav-item" data-view="reading-list">
      <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
      <span>독서관리</span>
      <span class="nav-badge" id="toread-badge"></span>
    </a>
    <a class="nav-item" data-view="all-books">
      <svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
      <span>전체 도서</span>
    </a>
    <a class="nav-item" data-view="settings">
      <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
      <span>설정</span>
    </a>
  </nav>
  <div class="sidebar-footer">
    <button class="btn-add-sidebar" id="addBookBtnSidebar">
      <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      <span>책 추가하기</span>
    </button>
  </div>
</aside>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<div class="main-wrapper">
  <header class="topbar">
    <button class="menu-btn" id="menuBtn">
      <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
    </button>
    <div class="topbar-title" id="topbarTitle">대시보드</div>
    <div class="topbar-actions">
      <button class="btn-topbar btn-topbar-icon" id="restoreTopBtn" title="데이터 복원" onclick="document.getElementById('restoreInputTop').click()">
        <svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
        <span>복원</span>
      </button>
      <button class="btn-topbar btn-topbar-icon" id="backupTopBtn" title="데이터 백업" onclick="backupData()">
        <svg viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
        <span>백업</span>
      </button>
      <div class="topbar-divider"></div>
      <button class="btn-topbar btn-topbar-primary" id="addBookBtnTop">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        <span>책 추가</span>
      </button>
    </div>
    <input type="file" id="restoreInputTop" style="display:none" accept=".json" onchange="restoreData(event)">
  </header>

  <main class="main-content">

    <!-- 대시보드 -->
    <div class="view active" id="view-dashboard">
      <div id="active-reading-section"></div>
      <div class="stat-grid">
        <div class="stat-card" data-view-link="all-books">
          <div class="stat-icon blue">📚</div>
          <div><div class="stat-value" id="stat-total">0</div><div class="stat-label">전체 도서</div></div>
        </div>
        <div class="stat-card" data-view-link="all-books">
          <div class="stat-icon green">✅</div>
          <div><div class="stat-value" id="stat-completed">0</div><div class="stat-label">완독</div></div>
        </div>
        <div class="stat-card" data-view-link="reading-list">
          <div class="stat-icon orange">📖</div>
          <div><div class="stat-value" id="stat-reading">0</div><div class="stat-label">읽는 중</div></div>
        </div>
        <div class="stat-card" data-view-link="reading-list">
          <div class="stat-icon purple">📅</div>
          <div><div class="stat-value" id="stat-thisyear">0</div><div class="stat-label">올해 완독</div></div>
        </div>
      </div>
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-title">📅 연도별 완독 현황</div>
          <div class="chart-wrap"><canvas id="yearChart"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">📂 장르별 비율</div>
          <div class="chart-wrap"><canvas id="genreChart"></canvas></div>
        </div>
        <div class="chart-card wide">
          <div class="chart-title">✍️ 작가별 완독 권수 (Top 10)</div>
          <div class="chart-wrap tall"><canvas id="authorChart"></canvas></div>
        </div>
      </div>
      <div class="recent-card">
        <div class="chart-title">🕐 최근 완독한 책</div>
        <div id="recent-books-list"></div>
      </div>
    </div>

    <!-- 읽을 책 -->
    <div class="view" id="view-reading-list">
      <div class="tab-bar">
        <div class="tab-btn active" id="tab-reading" onclick="setReadingTab('reading')">📖 서재 <span id="tab-reading-count"></span></div>
        <div class="tab-btn" id="tab-unread" onclick="setReadingTab('unread')">📋 대기목록 <span id="tab-unread-count"></span></div>
      </div>
      <div class="filters-bar">
        <input type="search" class="filter-input search-box" id="search-reading" placeholder="🔍 도서명, 작가명 검색...">
        <select class="filter-select" id="filter-genre-reading"><option value="">전체 장르</option></select>
        <select class="filter-select" id="filter-author-reading"><option value="">전체 작가</option></select>
        <span class="filters-count" id="reading-count">0권</span>
      </div>
      <div id="reading-list-container"></div>
    </div>

    <!-- 전체 도서 -->
    <div class="view" id="view-all-books">
      <div class="filters-bar">
        <input type="search" class="filter-input search-box" id="search-all" placeholder="🔍 도서명, 작가명 검색...">
        <select class="filter-select" id="filter-author-all"><option value="">전체 작가</option></select>
        <select class="filter-select" id="filter-genre-all"><option value="">전체 장르</option></select>
        <select class="filter-select" id="filter-status">
          <option value="">전체</option>
          <option value="completed">✅ 완독</option>
          <option value="reading">📚 서재</option>
          <option value="unread">📋 미완독</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">초기화</button>
        <span class="filters-count" id="all-books-count">0권</span>
      </div>
      <div class="table-container">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th onclick="sortTable('author')" id="th-author">작가명</th>
                <th onclick="sortTable('title')" id="th-title">도서명</th>
                <th onclick="sortTable('genre')" id="th-genre">장르</th>
                <th onclick="sortTable('publishDate')" id="th-publishDate">출판일</th>
                <th class="no-sort" style="text-align:center;min-width:54px">완독</th>
                <th class="no-sort" style="min-width:90px">서재</th>
                <th onclick="sortTable('completionDate')" id="th-completionDate">완독일</th>
                <th class="no-sort" style="min-width:110px">수정 / 삭제</th>
              </tr>
            </thead>
            <tbody id="all-books-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 설정 -->
    <div class="view" id="view-settings">

      <!-- 장르 관리 -->
      <div class="settings-section">
        <div class="settings-section-title">📂 장르 관리</div>
        <div class="settings-section-desc">장르를 추가하거나 이름을 수정할 수 있습니다. 도서에 사용 중인 장르는 삭제 시 '기타'로 변경됩니다.</div>
        <div class="genre-list" id="genre-list"></div>
        <div class="genre-add-row">
          <input type="text" class="genre-edit-input" id="new-genre-input" placeholder="새 장르 이름 입력..." maxlength="20">
          <button class="btn btn-primary btn-sm" onclick="addGenre()">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            추가
          </button>
        </div>
      </div>

      <!-- 백업 / 복원 -->
      <div class="settings-section">
        <div class="settings-section-title">💾 데이터 백업 / 복원</div>
        <div class="settings-section-desc">도서 데이터를 JSON 파일로 내보내거나 복원합니다. 다른 기기에서 사용할 때도 동일하게 활용하세요.</div>

        <div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:8px">📁 백업 저장 폴더 (참고용)</div>
        <div class="backup-folder-row">
          <div class="backup-folder-display" id="backup-folder-display">선택된 폴더 없음 — 브라우저 기본 다운로드 폴더에 저장됩니다</div>
          <button class="btn btn-secondary btn-sm" onclick="selectBackupFolder()">📁 폴더 선택</button>
        </div>
        <div class="info-box" style="margin-bottom:16px">
          <strong>💡 폴더 선택 안내:</strong> 크롬/엣지 브라우저에서 파일 시스템 접근을 지원합니다. 선택한 폴더에 백업 파일이 직접 저장됩니다.<br>
          파일을 직접 열어 사용하는 경우에는 브라우저 기본 다운로드 폴더로 저장됩니다.
        </div>

        <div class="backup-actions">
          <button class="btn btn-primary" onclick="backupData()">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
            JSON 백업 다운로드
          </button>
          <button class="btn btn-secondary" onclick="document.getElementById('restoreInput').click()">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
            JSON 파일로 복원
          </button>
          <button class="btn btn-secondary" onclick="resetToInitial()" style="color:var(--danger);border-color:var(--danger)">
            <svg viewBox="0 0 24 24" style="width:15px;height:15px"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
            초기 데이터로 초기화
          </button>
        </div>
        <input type="file" id="restoreInput" style="display:none" accept=".json" onchange="restoreData(event)">
        <div style="font-size:12px;color:var(--text-muted);margin-top:10px" id="backup-info"></div>
      </div>

      <!-- 저장 방식 안내 -->
      <div class="settings-section">
        <div class="settings-section-title">ℹ️ 저장 방식 안내</div>
        <div class="settings-section-desc" style="margin-bottom:0">
          • 모든 데이터는 이 기기의 <strong>브라우저 로컬 저장소(localStorage)</strong>에 저장됩니다.<br>
          • 다른 기기(PC, 스마트폰)에서 사용하려면 <strong>백업 → 다른 기기에서 복원</strong>하세요.<br>
          • 브라우저 데이터를 초기화하면 삭제될 수 있으니 정기적으로 백업하세요.<br>
          • 백업 파일은 JSON 형식으로 모든 기기에서 복원 가능합니다.
        </div>
      </div>
    </div>

  </main>
</div>

<!-- Book Modal -->
<div class="modal" id="bookModal">
  <div class="modal-box">
    <div class="modal-header">
      <div class="modal-title" id="modalTitle">책 추가</div>
      <button class="modal-close" id="modalClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
    </div>
    <form id="bookForm">
      <div class="modal-body">
        <input type="hidden" id="bookId">
        <div class="form-group">
          <label class="form-label">도서명 *</label>
          <input type="text" class="form-control" id="bookTitle" placeholder="도서명을 입력하세요" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">작가명 *</label>
            <input type="text" class="form-control" id="bookAuthor" placeholder="작가명" list="authorSuggestions" required>
            <datalist id="authorSuggestions"></datalist>
          </div>
          <div class="form-group">
            <label class="form-label">장르</label>
            <select class="form-control" id="bookGenre"></select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">출판일</label>
          <input type="text" class="form-control" id="bookPublishDate" placeholder="예) 2023.05.15 또는 2023년">
        </div>
        <div class="form-group">
          <label class="form-label">완독 여부</label>
          <div style="display:flex;gap:16px;margin-top:4px">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px"><input type="radio" name="bookStatus" value="unread" id="statusUnread" checked> 미완독</label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px"><input type="radio" name="bookStatus" value="reading" id="statusReading"> 서재 (읽는 중)</label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px"><input type="radio" name="bookStatus" value="completed" id="statusCompleted"> 완독</label>
          </div>
        </div>
        <div class="form-group" id="completionDateGroup" style="display:none">
          <label class="form-label">완독일</label>
          <input type="text" class="form-control" id="bookCompletionDate" placeholder="예) 2025.03.15">
        </div>
        <div class="form-group">
          <label class="form-label">메모</label>
          <textarea class="form-control" id="bookMemo" rows="2" placeholder="간단한 메모..." style="resize:vertical"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="cancelBtn">취소</button>
        <button type="submit" class="btn btn-primary" id="saveBtn">저장</button>
      </div>
    </form>
  </div>
</div>

<!-- Complete Modal -->
<div class="modal" id="completeModal">
  <div class="modal-box" style="max-width:380px">
    <div class="modal-header">
      <div class="modal-title">✅ 완독 기록</div>
      <button class="modal-close" id="completeModalClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="confirm-icon">🎉</div>
      <div class="confirm-msg">완독을 축하합니다!<br><span class="confirm-book-name" id="completeBookTitle"></span></div>
      <div class="form-group" style="margin-top:16px">
        <label class="form-label">완독일</label>
        <input type="text" class="form-control" id="completeDate" placeholder="예) 2025.03.15">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="completeCancelBtn">취소</button>
      <button class="btn btn-success" id="confirmCompleteBtn">완독 기록</button>
    </div>
  </div>
</div>

<!-- Genre Edit Modal -->
<div class="modal" id="genreModal">
  <div class="modal-box" style="max-width:360px">
    <div class="modal-header">
      <div class="modal-title">장르 수정</div>
      <button class="modal-close" id="genreModalClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">기존 장르명</label>
        <div style="padding:8px 12px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:14px" id="genre-old-name"></div>
      </div>
      <div class="form-group">
        <label class="form-label">새 장르명</label>
        <input type="text" class="form-control" id="genre-new-name" placeholder="새 장르명" maxlength="20">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="genreModalCancel">취소</button>
      <button class="btn btn-primary" onclick="saveGenreEdit()">저장</button>
    </div>
  </div>
</div>

<!-- Delete Modal -->
<div class="modal" id="deleteModal">
  <div class="modal-box" style="max-width:380px">
    <div class="modal-header">
      <div class="modal-title">삭제 확인</div>
      <button class="modal-close" id="deleteModalClose"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="confirm-icon">🗑️</div>
      <div class="confirm-msg">정말 삭제하시겠습니까?<br>
        <span class="confirm-book-name" id="deleteBookTitle"></span>
        <span style="display:block;font-size:12px;color:var(--danger);margin-top:8px">이 작업은 되돌릴 수 없습니다.</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="deleteCancelBtn">취소</button>
      <button class="btn btn-danger" id="deleteConfirmBtn">삭제</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* ===================== Initial Data ===================== */
const INITIAL_BOOKS = {books_js};

const DEFAULT_GENRES = ['문학','자연과학','철학','사회과학','역사','기술과학','예술','언어','종교','총류','기타'];

/* ===================== KDC Map ===================== */
const KDC_MAP = {{
  '총류':'000','철학':'100','철학/심리학':'100','심리학':'140',
  '종교':'200','사회과학':'300','통계학':'310','경제학':'320',
  '법학':'360','행정학':'350','교육학':'370',
  '자연과학':'400','수학':'410','물리학':'420','화학':'430',
  '생명과학':'470','지구과학':'450',
  '기술과학':'500','의학':'510','농업':'520','공학':'550',
  '예술':'600','음악':'670','미술':'650','스포츠':'690',
  '언어':'700','한국어':'710','영어':'740',
  '문학':'800','한국문학':'810','영미문학':'840','일본문학':'833',
  '역사':'900','역사/지리':'900','한국사':'911','세계사':'900',
}};

function getKDC(g) {{ return KDC_MAP[g||'']||''; }}

function genreBadgeHtml(g, extraStyle) {{
  const kdc=getKDC(g);
  const kdcTag=kdc?`<span style="opacity:.65;font-size:9px;font-weight:700;margin-right:3px;letter-spacing:.3px">${{kdc}}</span>`:'';
  const styleAttr=extraStyle?` style="${{extraStyle}}"`:'';
  return `<span class="genre-badge ${{genreClass(g)}}"${{styleAttr}}>${{kdcTag}}${{esc(g||'-')}}</span>`;
}}

/* ===================== State ===================== */
const state = {{
  books: [],
  genres: [],
  currentView: 'dashboard',
  readingTab: 'reading',   // 'reading' | 'unread'
  charts: {{}},
  sortCol: 'id', sortDir: 'asc',
  pendingDeleteId: null, pendingCompleteId: null,
  editingGenre: null,
  directoryHandle: null,
}};

const STORAGE_KEY = 'bookshelf_v1';
const GENRE_KEY = 'bookshelf_genres_v1';
const THIS_YEAR = new Date().getFullYear().toString();

/* ===================== Storage ===================== */
function saveBooks() {{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state.books)); }}
function saveGenres() {{ localStorage.setItem(GENRE_KEY, JSON.stringify(state.genres)); }}

function initData() {{
  // Books
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {{
    try {{ state.books = JSON.parse(saved); }} catch(e) {{ state.books = INITIAL_BOOKS.map(b=>({{...b}})); }}
  }} else {{
    state.books = INITIAL_BOOKS.map(b=>({{...b}}));
    saveBooks();
  }}
  // Genres
  const savedG = localStorage.getItem(GENRE_KEY);
  if (savedG) {{
    try {{ state.genres = JSON.parse(savedG); }} catch(e) {{ state.genres = [...DEFAULT_GENRES]; }}
  }} else {{
    // Collect genres from books + defaults
    const bookGenres = [...new Set(state.books.map(b=>b.genre).filter(Boolean))];
    state.genres = [...new Set([...DEFAULT_GENRES, ...bookGenres])];
    saveGenres();
  }}
}}

/* ===================== Utils ===================== */
function esc(s) {{ const d=document.createElement('div'); d.appendChild(document.createTextNode(s||'')); return d.innerHTML; }}
function today() {{ const d=new Date(); return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0'); }}
function nextId() {{ return state.books.length>0 ? Math.max(...state.books.map(b=>b.id||0))+1 : 1; }}

function genreClass(g) {{
  const m={{'문학':'genre-문학','자연과학':'genre-자연과학','철학':'genre-철학','사회과학':'genre-사회과학','역사':'genre-역사','총류':'genre-총류','기술과학':'genre-기술과학','예술':'genre-예술','언어':'genre-언어','종교':'genre-종교'}};
  return m[g]||'genre-기타';
}}

let toastTimer=null;
function showToast(msg) {{
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
}}

/* ===================== Badge ===================== */
function updateBadge() {{
  const n=state.books.filter(b=>!b.completed&&!b.reading).length;
  document.getElementById('toread-badge').textContent=n>0?n:'';
}}

/* ===================== View Switching ===================== */
const VIEW_TITLES = {{'dashboard':'대시보드','reading-list':'독서관리','all-books':'전체 도서','settings':'설정'}};

function switchView(v) {{
  state.currentView=v;
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===v));
  const el=document.getElementById('view-'+v);
  if(el) el.classList.add('active');
  document.getElementById('topbarTitle').textContent=VIEW_TITLES[v]||'';
  if(v==='dashboard') renderDashboard();
  else if(v==='reading-list') renderReadingList();
  else if(v==='all-books') renderAllBooks();
  else if(v==='settings') renderSettings();
  closeSidebar(); window.scrollTo(0,0);
}}

function openSidebar() {{ document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('open'); }}
function closeSidebar() {{ document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); }}

/* ===================== Dashboard ===================== */
function daysSince(dateStr) {{
  if(!dateStr) return 0;
  const parts=dateStr.split('.');
  if(parts.length<3) return 0;
  const start=new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]));
  const now=new Date(); now.setHours(0,0,0,0);
  return Math.max(0,Math.floor((now-start)/(1000*60*60*24))+1);
}}

function renderActiveReadingSection() {{
  const active=state.books.filter(b=>b.reading&&b.readingStartDate&&!b.completed);
  const el=document.getElementById('active-reading-section');
  if(!el) return;
  if(!active.length){{ el.innerHTML=''; return; }}
  el.innerHTML=`
    <div class="active-reading-section">
      <div class="active-reading-header">📖 현재 읽고 있는 책 (${{active.length}}권)</div>
      <div class="active-reading-cards">
        ${{active.map(b=>{{
          const days=daysSince(b.readingStartDate);
          return `<div class="active-reading-card">
            <div class="active-reading-title">${{esc(b.title)}}</div>
            <div class="active-reading-author">${{esc(b.author||'')}}</div>
            <div class="active-reading-days">📖 ${{days}}일째 읽는 중</div>
            <div class="active-reading-started">읽기 시작: ${{esc(b.readingStartDate)}}</div>
          </div>`;
        }}).join('')}}
      </div>
    </div>`;
}}

function renderDashboard() {{
  const books=state.books;
  const done=books.filter(b=>b.completed);
  const reading=books.filter(b=>!b.completed&&b.reading);
  const thisYear=done.filter(b=>(b.year||'')===THIS_YEAR||(b.completionDate||'').startsWith(THIS_YEAR));
  renderActiveReadingSection();
  document.getElementById('stat-total').textContent=books.length;
  document.getElementById('stat-completed').textContent=done.length;
  document.getElementById('stat-reading').textContent=reading.length;
  document.getElementById('stat-thisyear').textContent=thisYear.length;
  renderYearChart(done); renderGenreChart(done); renderAuthorChart(done); renderRecentBooks(done);
}}

function renderYearChart(done) {{
  const byYear={{}};
  done.forEach(b=>{{ const y=b.year||(b.completionDate||'').substring(0,4); if(y) byYear[y]=(byYear[y]||0)+1; }});
  const labels=Object.keys(byYear).sort();
  const ctx=document.getElementById('yearChart');
  if(state.charts.year) state.charts.year.destroy();
  state.charts.year=new Chart(ctx,{{type:'bar',data:{{labels,datasets:[{{data:labels.map(y=>byYear[y]),backgroundColor:'#1e3a5f',borderRadius:6,borderSkipped:false}}]}},
    options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}},scales:{{y:{{beginAtZero:true,ticks:{{stepSize:1,font:{{family:"'Noto Sans KR'"}}}},grid:{{color:'#f1f5f9'}}}},x:{{ticks:{{font:{{family:"'Noto Sans KR'"}}}},grid:{{display:false}}}}}}}}
  }});
}}

function renderGenreChart(done) {{
  const byG={{}};
  done.forEach(b=>{{ if(b.genre) byG[b.genre]=(byG[b.genre]||0)+1; }});
  const colors=['#1e3a5f','#2563eb','#16a34a','#ea580c','#7c3aed','#db2777','#0891b2','#65a30d','#d97706','#dc2626','#0f766e'];
  const sorted=Object.entries(byG).sort((a,b)=>b[1]-a[1]);
  const ctx=document.getElementById('genreChart');
  if(state.charts.genre) state.charts.genre.destroy();
  state.charts.genre=new Chart(ctx,{{type:'doughnut',data:{{labels:sorted.map(([g])=>g),datasets:[{{data:sorted.map(([,v])=>v),backgroundColor:colors,borderWidth:2,borderColor:'#fff'}}]}},
    options:{{responsive:true,maintainAspectRatio:false,plugins:{{legend:{{position:'right',labels:{{font:{{family:"'Noto Sans KR'",size:11}},padding:10}}}}}},cutout:'60%'}}
  }});
}}

function renderAuthorChart(done) {{
  const byA={{}};
  done.forEach(b=>{{ if(b.author) byA[b.author]=(byA[b.author]||0)+1; }});
  const sorted=Object.entries(byA).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const ctx=document.getElementById('authorChart');
  if(state.charts.author) state.charts.author.destroy();
  state.charts.author=new Chart(ctx,{{type:'bar',data:{{labels:sorted.map(([a])=>a),datasets:[{{data:sorted.map(([,v])=>v),backgroundColor:sorted.map((_,i)=>i===0?'#f6820c':'#1e3a5f'),borderRadius:6,borderSkipped:false}}]}},
    options:{{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{{legend:{{display:false}}}},scales:{{x:{{beginAtZero:true,ticks:{{stepSize:1,font:{{family:"'Noto Sans KR'"}}}},grid:{{color:'#f1f5f9'}}}},y:{{ticks:{{font:{{family:"'Noto Sans KR'",size:12}}}},grid:{{display:false}}}}}}}}
  }});
}}

function renderRecentBooks(done) {{
  const sorted=[...done].filter(b=>b.completionDate).sort((a,b)=>(b.completionDate||'').localeCompare(a.completionDate||'')).slice(0,8);
  const el=document.getElementById('recent-books-list');
  if(!sorted.length){{ el.innerHTML='<div style="padding:20px;text-align:center;color:var(--text-muted)">완독한 책이 없습니다.</div>'; return; }}
  const rc=['gold','silver','bronze'];
  el.innerHTML=sorted.map((b,i)=>`
    <div class="recent-item">
      <div class="recent-rank ${{rc[i]||''}}">${{i+1}}</div>
      <div class="recent-info"><div class="recent-title">${{esc(b.title)}}</div><div class="recent-author">${{esc(b.author||'')}}</div></div>
      <div class="recent-date">${{esc(b.completionDate||'')}}</div>
    </div>`).join('');
}}

/* ===================== Reading List ===================== */
let _readingTab = 'reading';

function setReadingTab(tab) {{
  _readingTab = tab;
  document.getElementById('tab-reading').classList.toggle('active', tab==='reading');
  document.getElementById('tab-unread').classList.toggle('active', tab==='unread');
  renderReadingList();
}}

function renderReadingList() {{
  const q=(document.getElementById('search-reading')?.value||'').toLowerCase();
  const ge=document.getElementById('filter-genre-reading')?.value||'';
  const au=document.getElementById('filter-author-reading')?.value||'';

  const allUnread=state.books.filter(b=>!b.completed);
  const shelfBooks=allUnread.filter(b=>b.reading);
  const waitlistBooks=allUnread.filter(b=>!b.reading);

  // Update tab counts
  document.getElementById('tab-reading-count').textContent=shelfBooks.length?`(${{shelfBooks.length}})`:'';
  document.getElementById('tab-unread-count').textContent=waitlistBooks.length?`(${{waitlistBooks.length}})`:'';

  // Populate filters from all unread
  const genres=[...new Set(allUnread.map(b=>b.genre).filter(Boolean))].sort();
  const authors=[...new Set(allUnread.map(b=>b.author).filter(Boolean))].sort();
  populateSelect('filter-genre-reading',genres,'전체 장르');
  populateSelect('filter-author-reading',authors,'전체 작가');

  let list = _readingTab==='reading' ? shelfBooks : waitlistBooks;
  if(q) list=list.filter(b=>b.title.toLowerCase().includes(q)||(b.author||'').toLowerCase().includes(q));
  if(ge) list=list.filter(b=>b.genre===ge);
  if(au) list=list.filter(b=>b.author===au);

  document.getElementById('reading-count').textContent=list.length+'권';
  const el=document.getElementById('reading-list-container');

  const isShelf = _readingTab==='reading';

  if(!list.length) {{
    el.innerHTML=`<div class="empty-state"><div class="empty-icon">${{isShelf?'📖':'📋'}}</div>
      <h3>${{isShelf?'서재에 책이 없습니다':'대기목록에 책이 없습니다'}}</h3>
      <p>${{isShelf?'대기목록에서 서재로 이동하거나 책을 추가하세요.':'모든 책을 완독했거나 등록된 책이 없습니다.'}}</p></div>`;
    return;
  }}

  el.innerHTML=`<div class="reading-order-list">`+list.map(b=>{{
    const started=b.readingStartDate;
    const days=started?daysSince(b.readingStartDate):0;
    if(isShelf) {{
      return `<div class="reading-item item-reading">
        ${{started?`<span class="reading-badge">📖 ${{days}}일째</span>`:`<span class="reading-badge" style="background:#f1f5f9;color:var(--text-secondary);border-color:var(--border)">📚 서재</span>`}}
        <div class="reading-info">
          <div class="reading-title">${{esc(b.title)}}</div>
          <div class="reading-sub">${{esc(b.author||'')}}${{b.genre?` &nbsp;${{genreBadgeHtml(b.genre,'font-size:10px;padding:1px 6px')}}`:''}}${{started?` &nbsp;<span style="font-size:11px;color:var(--text-muted)">시작: ${{esc(b.readingStartDate)}}</span>`:''}}</div>
        </div>
        <div class="reading-actions">
          ${{!started?`<button class="btn-card-action" style="background:var(--reading-bg);color:var(--reading-color);border-color:#fde68a;font-weight:700" onclick="startReading(${{b.id}})">📖 읽기 시작</button>`:''}}<button class="btn-card-action btn-card-complete" onclick="openCompleteModal(${{b.id}})">✅ 완독</button>
          <button class="btn-card-action" onclick="removeFromShelf(${{b.id}})" style="color:var(--text-muted)">← 대기목록</button>
          <button class="btn-card-action" onclick="openEditModal(${{b.id}})">✏️</button>
          <button class="btn-card-action btn-card-delete" onclick="openDeleteModal(${{b.id}})">🗑</button>
        </div>
      </div>`;
    }} else {{
      return `<div class="reading-item">
        <span style="width:8px;height:8px;border-radius:50%;background:#cbd5e1;display:inline-block;flex-shrink:0"></span>
        <div class="reading-info">
          <div class="reading-title">${{esc(b.title)}}</div>
          <div class="reading-sub">${{esc(b.author||'')}}${{b.genre?` &nbsp;${{genreBadgeHtml(b.genre,'font-size:10px;padding:1px 6px')}}`:''}}${{b.publishDate?` &nbsp;<span style="font-size:11px;color:var(--text-muted)">출판: ${{esc(b.publishDate)}}</span>`:''}}</div>
        </div>
        <div class="reading-actions">
          <button class="btn-card-action" style="background:#dbeafe;color:#1d4ed8;border-color:#bfdbfe;font-weight:700" onclick="moveToShelf(${{b.id}})">📚 서재로 이동</button>
          <button class="btn-card-action" onclick="openEditModal(${{b.id}})">✏️</button>
          <button class="btn-card-action btn-card-delete" onclick="openDeleteModal(${{b.id}})">🗑</button>
        </div>
      </div>`;
    }}
  }}).join('')+`</div>`;
}}

function moveToShelf(id) {{
  const book=state.books.find(b=>b.id===id);
  if(!book||book.completed) return;
  book.reading=true;
  saveBooks(); updateBadge(); renderReadingList();
  showToast('📚 서재로 이동되었습니다.');
}}

function startReading(id) {{
  const book=state.books.find(b=>b.id===id);
  if(!book||book.completed||!book.reading) return;
  book.readingStartDate=today();
  saveBooks(); renderReadingList(); renderActiveReadingSection();
  showToast('📖 읽기 시작! 오늘부터 기록됩니다.');
}}

function removeFromShelf(id) {{
  const book=state.books.find(b=>b.id===id);
  if(!book) return;
  book.reading=false; book.readingStartDate='';
  saveBooks(); updateBadge(); renderReadingList(); renderActiveReadingSection();
  showToast('대기목록으로 이동되었습니다.');
}}

function toggleReading(id, reading) {{
  const book=state.books.find(b=>b.id===id);
  if(!book) return;
  book.reading=reading;
  if(!reading) book.readingStartDate='';
  saveBooks(); updateBadge(); renderReadingList();
  showToast(reading?'📚 서재로 이동되었습니다.':'대기목록으로 이동되었습니다.');
}}

/* ===================== All Books Table ===================== */
function populateSelect(id, vals, label) {{
  const sel=document.getElementById(id); if(!sel) return;
  const cur=sel.value;
  sel.innerHTML=`<option value="">${{label}}</option>`+vals.map(v=>`<option value="${{esc(v)}}"${{v===cur?' selected':''}}>${{esc(v)}}</option>`).join('');
}}

function renderAllBooks() {{
  const q=(document.getElementById('search-all')?.value||'').toLowerCase();
  const st=document.getElementById('filter-status')?.value||'';
  const au=document.getElementById('filter-author-all')?.value||'';
  const ge=document.getElementById('filter-genre-all')?.value||'';

  const authors=[...new Set(state.books.map(b=>b.author).filter(Boolean))].sort();
  const genres=[...new Set(state.books.map(b=>b.genre).filter(Boolean))].sort();
  populateSelect('filter-author-all',authors,'전체 작가');
  populateSelect('filter-genre-all',genres,'전체 장르');

  let filtered=state.books.filter(b=>{{
    if(q&&!b.title.toLowerCase().includes(q)&&!(b.author||'').toLowerCase().includes(q)) return false;
    if(st==='completed'&&!b.completed) return false;
    if(st==='reading'&&(b.completed||!b.reading)) return false;
    if(st==='unread'&&(b.completed||b.reading)) return false;
    if(au&&b.author!==au) return false;
    if(ge&&b.genre!==ge) return false;
    return true;
  }});

  filtered=sortBooks(filtered,state.sortCol,state.sortDir);
  document.getElementById('all-books-count').textContent=`총 ${{filtered.length}}권`;

  const tbody=document.getElementById('all-books-tbody');
  if(!filtered.length){{
    tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">📭 검색 결과가 없습니다.</td></tr>`;
    return;
  }}

  tbody.innerHTML=filtered.map(b=>{{
    const isReading=!b.completed&&b.reading;
    return `<tr class="${{isReading?'row-reading':''}}">
      <td class="td-author">${{esc(b.author||'-')}}</td>
      <td class="td-title">${{esc(b.title)}}</td>
      <td>${{genreBadgeHtml(b.genre)}}</td>
      <td class="td-publish">${{esc(b.publishDate||'')}}</td>
      <td style="text-align:center">
        <input type="checkbox" class="completed-check" ${{b.completed?'checked':''}} onchange="toggleCompleted(${{b.id}},this.checked)">
      </td>
      <td>
        ${{!b.completed?`<button class="btn-reading-toggle ${{isReading?'active':''}}" onclick="toggleReadingFromTable(${{b.id}},this)">${{isReading?'📚 서재':'📚 서재로'}}</button>`:`<span style="font-size:12px;color:var(--text-muted)">—</span>`}}
      </td>
      <td class="td-completion-date">${{esc(b.completionDate||'')}}</td>
      <td class="td-actions">
        <button class="btn-edit-row" onclick="openEditModal(${{b.id}})">✏️ 수정</button>
        <button class="btn-delete-row" onclick="openDeleteModal(${{b.id}})">🗑</button>
      </td>
    </tr>`;
  }}).join('');
}}

function toggleReadingFromTable(id, btn) {{
  const book=state.books.find(b=>b.id===id);
  if(!book||book.completed) return;
  book.reading=!book.reading;
  if(!book.reading) book.readingStartDate='';
  saveBooks(); updateBadge();
  btn.classList.toggle('active',book.reading);
  btn.textContent=book.reading?'📚 서재':'📚 서재로';
  const row=btn.closest('tr');
  if(row) row.classList.toggle('row-reading',book.reading);
  showToast(book.reading?'📚 서재로 이동되었습니다.':'대기목록으로 이동되었습니다.');
}}

function sortBooks(books,col,dir) {{
  return [...books].sort((a,b)=>{{
    let av=a[col]||'',bv=b[col]||'';
    if(col==='id'){{av=a.id||0;bv=b.id||0;}}
    const c=typeof av==='number'?av-bv:(av||'').localeCompare(bv||'','ko');
    return dir==='asc'?c:-c;
  }});
}}

function sortTable(col) {{
  if(state.sortCol===col) state.sortDir=state.sortDir==='asc'?'desc':'asc';
  else{{ state.sortCol=col; state.sortDir='asc'; }}
  document.querySelectorAll('th[id^="th-"]').forEach(th=>th.classList.remove('sorted-asc','sorted-desc'));
  const th=document.getElementById('th-'+col);
  if(th) th.classList.add('sorted-'+state.sortDir);
  renderAllBooks();
}}

function resetFilters() {{
  ['search-all','filter-status','filter-author-all','filter-genre-all'].forEach(id=>{{ const el=document.getElementById(id); if(el) el.value=''; }});
  renderAllBooks();
}}

function toggleCompleted(id, checked) {{
  const book=state.books.find(b=>b.id===id);
  if(!book) return;
  if(checked&&!book.completed){{
    state.pendingCompleteId=id;
    document.getElementById('completeBookTitle').textContent=book.title;
    document.getElementById('completeDate').value=today();
    openModal('completeModal');
    const cb=event.target; if(cb) cb.checked=false;
  }}else if(!checked&&book.completed){{
    book.completed=false; book.completionDate=''; book.year=''; book.reading=false; book.readingStartDate='';
    saveBooks(); updateBadge(); renderAllBooks();
    showToast('완독이 취소되었습니다.');
  }}
}}

/* ===================== Settings ===================== */
function renderSettings() {{
  renderGenreList();
  const info=document.getElementById('backup-info');
  if(info) info.textContent=`현재 ${{state.books.length}}권의 도서 데이터가 저장되어 있습니다.`;
  // Update folder display
  if(state.directoryHandle) {{
    document.getElementById('backup-folder-display').textContent=state.directoryHandle.name;
  }}
  // Populate genre select in book form
  populateGenreSelect();
}}

function renderGenreList() {{
  const el=document.getElementById('genre-list');
  if(!el) return;
  const genreCounts={{}};
  state.books.forEach(b=>{{ if(b.genre) genreCounts[b.genre]=(genreCounts[b.genre]||0)+1; }});

  el.innerHTML=state.genres.map((g,i)=>{{
    const count=genreCounts[g]||0;
    const kdc=getKDC(g);
    return `<div class="genre-item">
      ${{genreBadgeHtml(g,'font-size:12px;padding:3px 10px')}}
      <span class="genre-item-name">${{esc(g)}}</span>
      ${{kdc?`<span style="font-size:11px;font-weight:700;color:var(--text-muted);background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:2px 6px;font-family:monospace">KDC ${{kdc}}</span>`:''}}
      <span class="genre-item-count">${{count}}권</span>
      <button class="btn btn-secondary btn-sm" onclick="openGenreEdit(${{i}})">✏️ 수정</button>
      <button class="btn btn-sm" onclick="deleteGenre(${{i}})" style="color:var(--danger);border:1px solid var(--border);border-radius:var(--radius-xs);padding:5px 10px;font-size:12px;font-weight:600;background:var(--bg);transition:all var(--tr)" onmouseover="this.style.background='var(--danger)';this.style.color='#fff'" onmouseout="this.style.background='var(--bg)';this.style.color='var(--danger)'">🗑</button>
    </div>`;
  }}).join('');
}}

function addGenre() {{
  const input=document.getElementById('new-genre-input');
  const name=input.value.trim();
  if(!name){{ input.focus(); return; }}
  if(state.genres.includes(name)){{ showToast('이미 존재하는 장르입니다.'); return; }}
  state.genres.push(name);
  saveGenres(); renderGenreList(); populateGenreSelect();
  input.value='';
  showToast(`✅ 장르 "${{name}}"이(가) 추가되었습니다.`);
}}

function openGenreEdit(idx) {{
  state.editingGenre=idx;
  const name=state.genres[idx];
  document.getElementById('genre-old-name').textContent=name;
  document.getElementById('genre-new-name').value=name;
  openModal('genreModal');
  setTimeout(()=>document.getElementById('genre-new-name').focus(),100);
}}

function saveGenreEdit() {{
  const idx=state.editingGenre;
  if(idx===null||idx===undefined) return;
  const newName=document.getElementById('genre-new-name').value.trim();
  if(!newName){{ showToast('장르 이름을 입력하세요.'); return; }}
  const oldName=state.genres[idx];
  if(newName===oldName){{ closeModal('genreModal'); return; }}
  if(state.genres.includes(newName)){{ showToast('이미 존재하는 장르입니다.'); return; }}
  // Update books with old genre
  state.books.forEach(b=>{{ if(b.genre===oldName) b.genre=newName; }});
  state.genres[idx]=newName;
  saveBooks(); saveGenres();
  closeModal('genreModal');
  renderGenreList(); populateGenreSelect();
  showToast(`✅ 장르가 "${{newName}}"(으)로 수정되었습니다.`);
  state.editingGenre=null;
}}

function deleteGenre(idx) {{
  const name=state.genres[idx];
  const count=state.books.filter(b=>b.genre===name).length;
  const msg=count>0?`"${{name}}" 장르를 삭제하시겠습니까?\\n이 장르를 사용하는 도서 ${{count}}권이 '기타'로 변경됩니다.`:`"${{name}}" 장르를 삭제하시겠습니까?`;
  if(!confirm(msg)) return;
  if(count>0) state.books.forEach(b=>{{ if(b.genre===name) b.genre='기타'; }});
  state.genres.splice(idx,1);
  // Ensure '기타' exists if we moved books there
  if(count>0&&!state.genres.includes('기타')) state.genres.push('기타');
  saveBooks(); saveGenres(); renderGenreList(); populateGenreSelect();
  showToast(`🗑️ 장르 "${{name}}"이(가) 삭제되었습니다.`);
}}

function populateGenreSelect() {{
  const sel=document.getElementById('bookGenre');
  if(!sel) return;
  const cur=sel.value;
  sel.innerHTML=state.genres.map(g=>`<option value="${{esc(g)}}"${{g===cur?' selected':''}}>${{esc(g)}}</option>`).join('');
}}

/* ===================== Backup ===================== */
async function selectBackupFolder() {{
  if(!window.showDirectoryPicker){{
    showToast('이 브라우저는 폴더 선택을 지원하지 않습니다.\\n(Chrome/Edge에서 지원)');
    return;
  }}
  try {{
    state.directoryHandle=await window.showDirectoryPicker({{mode:'readwrite'}});
    document.getElementById('backup-folder-display').textContent=state.directoryHandle.name;
    showToast('📁 폴더가 선택되었습니다: '+state.directoryHandle.name);
  }} catch(e) {{
    if(e.name!=='AbortError') showToast('폴더 선택 실패: '+e.message);
  }}
}}

async function backupData() {{
  const data={{version:'1.0',exportDate:new Date().toISOString(),totalBooks:state.books.length,books:state.books}};
  const json=JSON.stringify(data,null,2);
  const dateStr=new Date().toISOString().slice(0,10);
  const filename=`bookshelf_backup_${{dateStr}}.json`;

  if(state.directoryHandle) {{
    try {{
      const fileHandle=await state.directoryHandle.getFileHandle(filename,{{create:true}});
      const writable=await fileHandle.createWritable();
      await writable.write(json); await writable.close();
      showToast(`✅ 폴더에 백업이 저장되었습니다: ${{filename}}`);
      return;
    }} catch(e) {{ /* fall through */ }}
  }}
  // 일반 다운로드
  const blob=new Blob([json],{{type:'application/json'}});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
  showToast('📥 백업 파일이 다운로드되었습니다.');
}}

function restoreData(event) {{
  const file=event.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=(e)=>{{
    try {{
      const data=JSON.parse(e.target.result);
      let books=Array.isArray(data)?data:(data.books&&Array.isArray(data.books)?data.books:null);
      if(!books||!books.length) throw new Error('올바른 형식이 아닙니다');
      if(!confirm(`${{books.length}}권의 도서 데이터를 복원하시겠습니까?\\n현재 데이터(${{state.books.length}}권)가 교체됩니다.`)) return;
      state.books=books;
      saveBooks(); showToast(`✅ ${{books.length}}권의 데이터가 복원되었습니다.`);
      setTimeout(()=>location.reload(),1500);
    }} catch(err) {{ showToast('❌ 파일을 읽을 수 없습니다: '+err.message); }}
    event.target.value='';
  }};
  reader.readAsText(file,'utf-8');
}}

function resetToInitial() {{
  if(!confirm(`초기 데이터로 초기화하시겠습니까?\\n현재 데이터(${{state.books.length}}권)가 초기 데이터(${{INITIAL_BOOKS.length}}권)로 교체됩니다.`)) return;
  state.books=INITIAL_BOOKS.map(b=>({{...b}}));
  saveBooks(); showToast('✅ 초기 데이터로 초기화되었습니다.');
  setTimeout(()=>location.reload(),1500);
}}

/* ===================== Book Modal ===================== */
function openAddModal() {{
  document.getElementById('modalTitle').textContent='책 추가';
  document.getElementById('bookId').value='';
  document.getElementById('bookTitle').value='';
  document.getElementById('bookAuthor').value='';
  document.getElementById('bookPublishDate').value='';
  document.getElementById('statusUnread').checked=true;
  document.getElementById('bookCompletionDate').value='';
  document.getElementById('bookMemo').value='';
  document.getElementById('completionDateGroup').style.display='none';
  populateGenreSelect();
  updateAuthorSuggestions();
  openModal('bookModal');
  setTimeout(()=>document.getElementById('bookTitle').focus(),100);
}}

function openEditModal(id) {{
  const b=state.books.find(b=>b.id===id); if(!b) return;
  document.getElementById('modalTitle').textContent='책 수정';
  document.getElementById('bookId').value=b.id;
  document.getElementById('bookTitle').value=b.title;
  document.getElementById('bookAuthor').value=b.author||'';
  document.getElementById('bookPublishDate').value=b.publishDate||'';
  document.getElementById('bookCompletionDate').value=b.completionDate||'';
  document.getElementById('bookMemo').value=b.memo||'';
  populateGenreSelect();
  document.getElementById('bookGenre').value=b.genre||state.genres[0]||'문학';
  if(b.completed) document.getElementById('statusCompleted').checked=true;
  else if(b.reading) document.getElementById('statusReading').checked=true;
  else document.getElementById('statusUnread').checked=true;
  document.getElementById('completionDateGroup').style.display=b.completed?'block':'none';
  updateAuthorSuggestions();
  openModal('bookModal');
}}

function updateAuthorSuggestions() {{
  const authors=[...new Set(state.books.map(b=>b.author).filter(Boolean))].sort();
  document.getElementById('authorSuggestions').innerHTML=authors.map(a=>`<option value="${{esc(a)}}">`).join('');
}}

function saveBook(e) {{
  e.preventDefault();
  const id=parseInt(document.getElementById('bookId').value)||null;
  const title=document.getElementById('bookTitle').value.trim();
  const author=document.getElementById('bookAuthor').value.trim();
  if(!title){{ document.getElementById('bookTitle').focus(); return; }}
  if(!author){{ document.getElementById('bookAuthor').focus(); return; }}
  const statusVal=document.querySelector('input[name="bookStatus"]:checked')?.value||'unread';
  const completed=statusVal==='completed';
  const reading=statusVal==='reading';
  const completionDate=completed?document.getElementById('bookCompletionDate').value.trim():'';
  const year=completionDate?completionDate.substring(0,4):'';
  const existingBook=id?state.books.find(b=>b.id===id):null;
  const readingStartDate=(reading&&existingBook?.readingStartDate)?existingBook.readingStartDate:(completed?'':'');
  const bookData={{title,author,genre:document.getElementById('bookGenre').value,publishDate:document.getElementById('bookPublishDate').value.trim(),completed,reading,readingStartDate,completionDate,year,memo:document.getElementById('bookMemo').value.trim()}};
  if(id){{
    const idx=state.books.findIndex(b=>b.id===id);
    if(idx!==-1){{ state.books[idx]={{...state.books[idx],...bookData}}; showToast('✅ 수정되었습니다.'); }}
  }}else{{
    state.books.push({{id:nextId(),addedDate:today(),...bookData}});
    showToast('✅ 책이 추가되었습니다.');
  }}
  saveBooks(); closeModal('bookModal'); updateBadge(); refreshCurrentView();
}}

/* ===================== Complete Modal ===================== */
function openCompleteModal(id) {{
  const b=state.books.find(b=>b.id===id); if(!b) return;
  state.pendingCompleteId=id;
  document.getElementById('completeBookTitle').textContent=b.title;
  document.getElementById('completeDate').value=today();
  openModal('completeModal');
}}

function confirmComplete() {{
  const id=state.pendingCompleteId; if(!id) return;
  const dateVal=document.getElementById('completeDate').value.trim();
  const book=state.books.find(b=>b.id===id);
  if(book){{ book.completed=true; book.reading=false; book.readingStartDate=''; book.completionDate=dateVal; book.year=dateVal?dateVal.substring(0,4):THIS_YEAR; saveBooks(); updateBadge(); refreshCurrentView(); showToast('🎉 완독을 축하합니다!'); }}
  closeModal('completeModal'); state.pendingCompleteId=null;
}}

/* ===================== Delete Modal ===================== */
function openDeleteModal(id) {{
  const b=state.books.find(b=>b.id===id); if(!b) return;
  state.pendingDeleteId=id;
  document.getElementById('deleteBookTitle').textContent=b.title;
  openModal('deleteModal');
}}

function confirmDelete() {{
  const id=state.pendingDeleteId; if(!id) return;
  state.books=state.books.filter(b=>b.id!==id);
  saveBooks(); closeModal('deleteModal'); updateBadge(); refreshCurrentView();
  showToast('🗑️ 삭제되었습니다.'); state.pendingDeleteId=null;
}}

/* ===================== Modal Helpers ===================== */
function openModal(id){{ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }}
function closeModal(id){{ document.getElementById(id).classList.remove('open'); document.body.style.overflow=''; }}

function refreshCurrentView() {{
  const v=state.currentView;
  if(v==='dashboard') renderDashboard();
  else if(v==='reading-list') renderReadingList();
  else if(v==='all-books') renderAllBooks();
  else if(v==='settings') renderSettings();
}}

/* ===================== Events ===================== */
function initEvents() {{
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',e=>{{ e.preventDefault(); switchView(el.dataset.view); }}));
  document.querySelectorAll('.stat-card[data-view-link]').forEach(el=>el.addEventListener('click',()=>switchView(el.dataset.viewLink)));
  document.getElementById('menuBtn').addEventListener('click',openSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click',closeSidebar);
  ['addBookBtnSidebar','addBookBtnTop'].forEach(id=>document.getElementById(id)?.addEventListener('click',openAddModal));
  document.getElementById('bookForm').addEventListener('submit',saveBook);
  document.getElementById('modalClose').addEventListener('click',()=>closeModal('bookModal'));
  document.getElementById('cancelBtn').addEventListener('click',()=>closeModal('bookModal'));
  document.querySelectorAll('input[name="bookStatus"]').forEach(r=>r.addEventListener('change',()=>{{
    document.getElementById('completionDateGroup').style.display=document.getElementById('statusCompleted').checked?'block':'none';
  }}));
  document.getElementById('completeModalClose').addEventListener('click',()=>closeModal('completeModal'));
  document.getElementById('completeCancelBtn').addEventListener('click',()=>closeModal('completeModal'));
  document.getElementById('confirmCompleteBtn').addEventListener('click',confirmComplete);
  document.getElementById('genreModalClose').addEventListener('click',()=>closeModal('genreModal'));
  document.getElementById('genreModalCancel').addEventListener('click',()=>closeModal('genreModal'));
  document.getElementById('new-genre-input')?.addEventListener('keydown',e=>{{ if(e.key==='Enter'){{ e.preventDefault(); addGenre(); }} }});
  document.getElementById('genre-new-name')?.addEventListener('keydown',e=>{{ if(e.key==='Enter'){{ e.preventDefault(); saveGenreEdit(); }} }});
  document.getElementById('deleteModalClose').addEventListener('click',()=>closeModal('deleteModal'));
  document.getElementById('deleteCancelBtn').addEventListener('click',()=>closeModal('deleteModal'));
  document.getElementById('deleteConfirmBtn').addEventListener('click',confirmDelete);
  ['bookModal','completeModal','deleteModal','genreModal'].forEach(id=>document.getElementById(id).addEventListener('click',e=>{{ if(e.target.id===id) closeModal(id); }}));
  ['search-all','filter-status','filter-author-all','filter-genre-all'].forEach(id=>{{
    document.getElementById(id)?.addEventListener('input',renderAllBooks);
    document.getElementById(id)?.addEventListener('change',renderAllBooks);
  }});
  ['search-reading','filter-genre-reading','filter-author-reading'].forEach(id=>{{
    document.getElementById(id)?.addEventListener('input',renderReadingList);
    document.getElementById(id)?.addEventListener('change',renderReadingList);
  }});
  document.addEventListener('keydown',e=>{{
    if(e.key==='Escape') ['bookModal','completeModal','deleteModal','genreModal'].forEach(closeModal);
    if((e.ctrlKey||e.metaKey)&&e.key==='k'){{ e.preventDefault(); openAddModal(); }}
  }});
}}

/* ===================== Init ===================== */
function init() {{
  initData();
  populateGenreSelect();
  initEvents();
  updateBadge();
  renderDashboard();
}}

document.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>'''

output_path = r'C:\Users\bate9\OneDrive\antigravity-projects\bookshelf\index.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

size_kb = len(html.encode('utf-8')) / 1024
print(f'Written: {output_path}')
print(f'Size: {size_kb:.1f} KB')
