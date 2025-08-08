// app/api/views/[slug]/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// 从环境变量中读取Supabase的URL和密钥
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 创建一个只在服务器端使用的Supabase客户端
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    // 调用一个数据库函数 'increment_view_count'
    // 这个函数会原子性地增加计数值并返回最新值
    const { data, error } = await supabase.rpc('increment_view_count', {
      page_slug: slug,
    });

    if (error) {
      console.error('Error incrementing view count:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ view_count: data }, { status: 200 });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
