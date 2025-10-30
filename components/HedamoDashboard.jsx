
"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// -------------------- Mock Data & API --------------------
const MOCK_PRODUCTS = [
  {
    id: 'p1',
    productName: 'Organic Herbal Tea',
    score: 72,
    status: 'Published',
    updatedAt: '2025-10-20',
    explanation: 'Moderate transparency. Missing sourcing details for 2 ingredients.',
    suggestions: [
      'Add sourcing details for green tea leaves.',
      "Include certification ID for 'organic' claim.",
      'Clarify packaging recyclability.'
    ],
    flags: ['Incomplete sourcing', 'Unverified organic claim']
  },
  {
    id: 'p2',
    productName: 'Sustainably Sourced Olive Oil',
    score: 88,
    status: 'Published',
    updatedAt: '2025-10-10',
    explanation: 'High transparency. All certifications present.',
    suggestions: ['Add batch-level traceability docs.'],
    flags: []
  },
  {
    id: 'p3',
    productName: 'Plant-Based Protein Bar',
    score: 45,
    status: 'Draft',
    updatedAt: '2025-09-30',
    explanation: 'Low transparency. Missing supplier verifications and unclear ingredient origin.',
    suggestions: ['Verify supplier credentials.', 'Provide origin for soy isolate.'],
    flags: ['Missing supplier verification', 'Unclear ingredient origin']
  }
]

function mockFetchProducts() {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500))
}

function mockSubmitProduct(formData) {
  // Simulate AI response appended to product
  return new Promise((resolve) =>
    setTimeout(() =>
      resolve({
        ...formData,
        id: 'p' + Math.floor(Math.random() * 1000),
        score: Math.floor(50 + Math.random() * 50),
        explanation: 'AI review: Good start; consider adding certification IDs and sourcing details.',
        suggestions: [
          'Add certification ID for claimed certifications.',
          'Provide supplier/source country for 1-3 ingredients.'
        ],
        flags: ['Potentially unverified claims']
      })
    , 900)
  )
}

// -------------------- Utilities --------------------
const scoreColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-amber-400'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

// Radial progress SVG component
function RadialProgress({ score, size = 96 }) {
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <defs>
        <linearGradient id="grad1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size/2}, ${size/2})`}>
        <circle r={radius} cx={0} cy={0} strokeWidth={stroke} stroke="#e5e7eb" fill="none" />
        <motion.circle
          r={radius}
          cx={0}
          cy={0}
          strokeWidth={stroke}
          stroke="url(#grad1)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <text x={0} y={6} textAnchor="middle" fontSize={18} fontWeight={700} fill="#111827">
          {score}
        </text>
        <text x={0} y={26} textAnchor="middle" fontSize={11} fill="#6b7280">
          Transparency
        </text>
      </g>
    </svg>
  )
}

// -------------------- Main Dashboard Component --------------------
export default function HedamoDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('score_desc')
  const [showDrafts, setShowDrafts] = useState(true)
  const [dark, setDark] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    setLoading(true)
    mockFetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  const filtered = useMemo(() => {
    let arr = products.filter(p => (showDrafts ? true : p.status !== 'Draft'))
    if (query) arr = arr.filter(p => p.productName.toLowerCase().includes(query.toLowerCase()))
    if (sortBy === 'score_desc') arr = arr.sort((a,b) => b.score - a.score)
    if (sortBy === 'score_asc') arr = arr.sort((a,b) => a.score - b.score)
    if (sortBy === 'updated') arr = arr.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return arr
  }, [products, query, sortBy, showDrafts])

  const openProduct = (p) => setSelected(p)

  const handleSubmitNew = async (formData) => {
    setNotify('Submitting product...')
    const created = await mockSubmitProduct(formData)
    setProducts(prev => [created, ...prev])
    setShowWizard(false)
    setNotify('Product submitted — AI feedback added')
    setTimeout(()=>setNotify(null), 2500)
    setSelected(created)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={()=>setDark(d=>!d)} className="px-3 py-2 rounded-md bg-white/60 dark:bg-gray-800/60">
              {dark ? '🌙 Dark' : '🌤 Light'}
            </button>
            <h1 className="text-2xl font-semibold">Hedamo — Product Transparency</h1>
            <span className="text-sm text-gray-500 dark:text-gray-300">for producers</span>
          </div>
          <div className="flex items-center gap-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border" />
            <button onClick={()=>setShowWizard(true)} className="px-4 py-2 rounded-md bg-blue-600 text-white">Add Product</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar / Filters */}
          <aside className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h2 className="font-medium mb-3">Filters</h2>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Show Drafts</label>
              <input type="checkbox" checked={showDrafts} onChange={e=>setShowDrafts(e.target.checked)} />
            </div>
            <div className="mb-3">
              <label className="text-sm">Sort</label>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="w-full mt-1 p-2 rounded-md bg-white dark:bg-gray-700 border">
                <option value="score_desc">Score: High → Low</option>
                <option value="score_asc">Score: Low → High</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Legend</h3>
              <div className="flex gap-2 items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> High (80+)
              </div>
              <div className="flex gap-2 items-center text-sm mt-1">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span> Moderate (60-79)
              </div>
              <div className="flex gap-2 items-center text-sm mt-1">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span> Low (40-59)
              </div>
              <div className="flex gap-2 items-center text-sm mt-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Poor (&lt;40)
              </div>
            </div>
          </aside>

          {/* Main table */}
          <main className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Products</h2>
                <div className="text-sm text-gray-500 dark:text-gray-300">{filtered.length} items</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 dark:text-gray-300">
                      <th className="p-2">Product</th>
                      <th className="p-2">Score</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Updated</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={5} className="p-4">Loading...</td></tr>
                    ) : filtered.map(p => (
                      <tr key={p.id} className="border-t dark:border-gray-700">
                        <td className="p-3 align-middle">
                          <div className="font-medium">{p.productName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {p.id}</div>
                        </td>
                        <td className="p-3 align-middle">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${scoreColor(p.score)}`}>{p.score}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{p.score} / 100</div>
                          </div>
                        </td>
                        <td className="p-3 align-middle"><span className="text-sm">{p.status}</span></td>
                        <td className="p-3 align-middle text-sm text-gray-500 dark:text-gray-400">{p.updatedAt}</td>
                        <td className="p-3 align-middle">
                          <button onClick={()=>openProduct(p)} className="px-3 py-1 rounded-md bg-blue-50 dark:bg-gray-700">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Detail panel */}
            <AnimatePresence>
              {selected && (
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}} className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex gap-6 md:gap-12">
                    <div className="w-40 flex-shrink-0">
                      <RadialProgress score={selected.score} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{selected.productName}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{selected.explanation}</div>
                        </div>
                        <div className="text-sm text-gray-500">Status: {selected.status}</div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium">AI Suggestions</h4>
                          <ul className="mt-2 space-y-2">
                            {selected.suggestions.map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">✓</div>
                                <div className="text-sm">{s}</div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">Flags</h4>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {selected.flags.length === 0 && <div className="text-sm text-gray-500">No risk flags</div>}
                            {selected.flags.map((f, i) => (
                              <span key={i} className={`px-2 py-1 rounded-md text-xs ${i===0? 'bg-red-600 text-white' : 'bg-amber-300 text-black'}`}>{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button onClick={()=>setSelected(null)} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700">Close</button>
                        <button className="px-3 py-1 rounded-md bg-green-600 text-white">Resolve Flags</button>
                        <button className="px-3 py-1 rounded-md bg-yellow-500 text-white">Request Review</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </main>
        </div>
      </div>

      {/* Footer small notifier */}
      {notify && (
        <div className="fixed bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded-md">{notify}</div>
      )}

      {/* Wizard modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
            <motion.div initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg p-6">
              <Wizard onClose={()=>setShowWizard(false)} onSubmit={handleSubmitNew} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

// -------------------- Wizard (Multi-step Form) --------------------
function Wizard({ onClose, onSubmit }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ productName: '', ingredients: [], certifications: [] })
  const [tempIngredient, setTempIngredient] = useState('')

  const steps = ['Basic Info', 'Ingredients', 'Certifications', 'Review']

  function addIngredient() {
    if (!tempIngredient) return
    setForm(f=>({ ...f, ingredients: [...f.ingredients, tempIngredient]}))
    setTempIngredient('')
  }

  function removeIngredient(i) {
    setForm(f=>({ ...f, ingredients: f.ingredients.filter((_,idx)=>idx!==i) }))
  }

  async function handleFinish() {
    // Send to mock AI backend
    await onSubmit({ productName: form.productName, ingredients: form.ingredients, certifications: form.certifications })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Add Product — {steps[step]}</h3>
        <button onClick={onClose} className="text-sm text-gray-500">Close</button>
      </div>

      <div className="mb-6">
        <progress value={step+1} max={steps.length} className="w-full h-2 bg-gray-200 rounded-full" />
        <div className="flex justify-between text-xs mt-2">
          {steps.map((s, i) => (
            <div key={i} className={`px-2 py-1 rounded ${i===step ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{s}</div>
          ))}
        </div>
      </div>

      <div className="min-h-[180px]">
        {step === 0 && (
          <div>
            <label className="block text-sm">Product Name</label>
            <input value={form.productName} onChange={e=>setForm(f=>({...f, productName: e.target.value}))} className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border" />
          </div>
        )}

        {step === 1 && (
          <div>
            <label className="block text-sm">Ingredients</label>
            <div className="flex gap-2 mt-2">
              <input value={tempIngredient} onChange={e=>setTempIngredient(e.target.value)} className="flex-1 p-2 rounded-md bg-gray-50 dark:bg-gray-700 border" placeholder="e.g. Green tea leaves" />
              <button onClick={addIngredient} className="px-3 py-2 bg-blue-600 text-white rounded-md">Add</button>
            </div>
            <ul className="mt-3 space-y-2">
              {form.ingredients.map((ing,i)=> (
                <li key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-md">
                  <div className="text-sm">{ing}</div>
                  <button onClick={()=>removeIngredient(i)} className="text-xs text-red-500">Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm">Certifications</label>
            <input value={form.certifications.join(', ')} onChange={e=>setForm(f=>({...f, certifications: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}))} className="w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border" placeholder="e.g. USDA Organic, Fair Trade" />
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="text-sm font-medium">Review</h4>
            <div className="mt-2 text-sm">
              <div><strong>Name:</strong> {form.productName || '-'} </div>
              <div><strong>Ingredients:</strong> {form.ingredients.join(', ') || '-'}</div>
              <div><strong>Certifications:</strong> {form.certifications.join(', ') || '-'}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <div>
          {step > 0 && <button onClick={()=>setStep(s=>s-1)} className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 mr-2">Back</button>}
          <button onClick={()=> step < steps.length-1 ? setStep(s=>s+1) : handleFinish()} className="px-3 py-1 rounded-md bg-blue-600 text-white">{step < steps.length-1 ? 'Next' : 'Submit'}</button>
        </div>
        <div className="text-sm text-gray-500">Step {step+1} / {steps.length}</div>
      </div>

    </div>
  )
}
