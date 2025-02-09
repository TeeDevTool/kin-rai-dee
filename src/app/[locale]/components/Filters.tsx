import { Button } from "@/components/ui/button";

export function Filters() {
  return (
    <div className="mb-8 grid w-full gap-6 lg:mb-12">
      <h4 className="text-subtitle1 w-fit text-gray-700">หมวดยอดฮิต</h4>

      <h4 className="text-subtitle1 w-fit text-gray-700">แยกตามภูมิภาค</h4>
      <div className="flex flex-wrap gap-3">
        <Button className="min-w-30" variant="outline">
          อาหารเหนือ
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารอีสาน
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารใต้
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารภาคกลาง
        </Button>
      </div>

      <h4 className="text-subtitle1 w-fit text-gray-700">แยกตามสัญชาติ</h4>
      <div className="flex flex-wrap gap-3">
        <Button className="min-w-30" variant="outline">
          อาหารไทย
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารจีน
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารเกาหลี
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารญี่ปุ่น
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารเวียดนาม
        </Button>
        <Button className="min-w-30" variant="outline">
          อาหารตะวันตก
        </Button>
      </div>
    </div>
  );
}
