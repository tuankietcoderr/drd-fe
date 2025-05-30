import {Building2, Mail, MapPin, Phone} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RecruiterItem = ({recruiter}) => {
  return (
    <Link
      href={`/cong-ty/${recruiter.id}`}
      className="flex gap-4 rounded-lg border bg-background p-4 transition-colors hover:border-primary">
      <div>
        <Image
          src={
            recruiter.recruiterAvatar ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiter.companyName)}`
          }
          width={100}
          height={100}
          alt={recruiter.companyName}
          unoptimized
          onError={e => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiter.companyName)}`;
            e.currentTarget.srcset = '';
            e.currentTarget.onerror = null; // Prevent infinite loop
          }}
        />
      </div>
      <div className="flex-1 space-y-4">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{recruiter.companyName}</h2>
          <p className="line-clamp-2 text-sm">
            {recruiter.description || 'Chưa có mô tả cho công ty này.'}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <p className="flex items-center gap-2 text-sm">
              <Mail size={14} />
              <span>{recruiter.email || 'Không có email'}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Phone size={14} />
              <span>{recruiter.phone || 'Không có số điện thoại'}</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MapPin size={14} />
              <span>{recruiter.address || 'Không có địa chỉ cụ thể'}</span>
            </p>
            {recruiter.businessType && (
              <p className="flex items-center gap-2 text-sm">
                <Building2 size={14} />
                <span>{recruiter.businessType}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const RecruiterItemSkeleton = () => {
  return (
    <div className="flex gap-4 rounded-lg border bg-background p-4">
      <div className="size-24 animate-pulse bg-gray-200" />
      <div className="flex-1 space-y-4">
        <div className="h-6 w-full animate-pulse bg-gray-200" />
        <div className="h-4 w-full animate-pulse bg-gray-200" />
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="h-4 w-1/2 animate-pulse bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default RecruiterItem;
