export async function Copyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-label1 mt-3 flex justify-center gap-1 text-gray-300 md:justify-end xl:justify-center">
      © <span>{year}</span> KinRaiDee - All rights reserved
    </p>
  );
}
