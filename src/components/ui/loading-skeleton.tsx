import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProjectCardSkeleton = () => (
  <Card className="glass-card border-border/50">
    <div className="aspect-video">
      <Skeleton className="w-full h-full rounded-t-lg" />
    </div>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SkillCardSkeleton = () => (
  <Card className="glass-card border-border/50">
    <CardHeader className="text-center">
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-24 mx-auto" />
      <Skeleton className="h-4 w-16 mx-auto" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-2 w-full mb-2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-8" />
      </div>
    </CardContent>
  </Card>
);

export const CertificateCardSkeleton = () => (
  <Card className="glass-card border-border/50">
    <div className="aspect-[4/3]">
      <Skeleton className="w-full h-full rounded-t-lg" />
    </div>
    <CardHeader>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </CardHeader>
  </Card>
);

export const DashboardStatSkeleton = () => (
  <Card className="glass-card border-border/50">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="w-8 h-8" />
      </div>
    </CardContent>
  </Card>
);