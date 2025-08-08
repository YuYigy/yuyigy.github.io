// app/api/views/[slug]/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// 在 Vercel 上避免在构建阶段读取 env，改为运行时读取
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase envs: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ error: 'Server env not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 读取当前计数（只读，不自增）
    // 兼容不同的表结构：优先尝试 page_views(view_count, slug)，再尝试 views(count, slug)
    let count: number | null = null;

    // 尝试 page_views.view_count
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('view_count')
        .eq('slug', slug)
        .single();
      if (!error && data && typeof data.view_count === 'number') {
        count = data.view_count;
      }
    } catch (e) {
      // 忽略，进入下一种结构尝试
    }

    // 若未读到，再尝试 views.count
    if (count === null) {
      try {
        const { data, error } = await supabase
          .from('views')
          .select('count')
          .eq('slug', slug)
          .single();
        if (!error && data && typeof (data as any).count === 'number') {
          count = (data as any).count as number;
        }
      } catch (e) {
        // 忽略
      }
    }

    // 若依然没有，返回 0（视为尚未有记录）
    return NextResponse.json({ view_count: count ?? 0 }, { status: 200 });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase envs: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ error: 'Server env not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // 使用已存在的数据库函数 increment_view_count 做原子自增
    const { data, error } = await supabase.rpc('increment_view_count', {
      page_slug: slug,
    });

    if (error) {
      console.error('Error incrementing view count:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ view_count: data ?? 0 }, { status: 200 });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
