import { db } from './src/db';
import { supabase } from './src/lib/supabase';

async function testConnections() {
  console.log('🔍 Testing database and Supabase connections...');
  
  try {
    // データベース接続テスト
    console.log('📊 Testing database connection...');
    const result = await db.execute('SELECT NOW() as current_time');
    console.log('✅ Database connection successful:', result);
    
    // Supabase接続テスト
    console.log('🔐 Testing Supabase connection...');
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log('⚠️ Supabase connection test (expected for unauthenticated user):', error.message);
    } else {
      console.log('✅ Supabase connection successful');
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

testConnections(); 