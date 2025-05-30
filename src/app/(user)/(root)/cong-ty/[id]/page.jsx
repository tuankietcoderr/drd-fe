import RecruiterDetail from '@/components/views/user/cong-ty/RecruiterDetail';
import RecruiterPosts from '@/components/views/user/cong-ty/RecruiterPosts';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';

const page = async ({params}) => {
  const {id} = await params;
  return (
    <div className="space-y-4">
      <Link
        href="/cong-ty"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <ChevronLeft size={20} />
        Danh sách công ty
      </Link>
      <RecruiterDetail recruiterId={id} />
      <RecruiterPosts recruiterId={id} />
    </div>
  );
};

export default page;
