import { createClient } from '@supabase/supabase-js'

 // Savi SUPABASE
// const supabaseUrl = 'https://fyefjssqrwehnwgumukh.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZWZqc3NxcndlaG53Z3VtdWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyODY5ODEsImV4cCI6MjA0NTg2Mjk4MX0.-u4M6hShSa9qy2l6S2oPcRir6dJ0APC8ZmNT6TsapgU'

// CAMIE SUPABSE
const supabaseUrl = 'https://ecqxwnmbcgzffbmgmqlg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcXh3bm1iY2d6ZmZibWdtcWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NDkzNjEsImV4cCI6MjAyNzEyNTM2MX0.v3RvpmXM7cEyAntuynSIRaMH3d_LpJ1NGFkVJ1LsJFI'

const supabase = createClient(supabaseUrl, supabaseKey)
   

export default supabase
