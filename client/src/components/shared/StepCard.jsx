export default function StepCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-[32px] p-12 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 max-w-[360px] w-full mx-auto text-center flex flex-col items-center space-y-6">
      <div className="bg-modern-green text-white rounded-full p-8 shadow-md">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}