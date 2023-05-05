function StepBlock({ stepIndex, title, isActive = false }) {
  return (
    <div class="flex items-start sm:gap-5 min-w-max">
      <span
        class="flex items-center justify-center border-2 border-white/50 rounded-full h-10 aspect-square font-bold"
        classList={{
          "bg-sky-200": isActive(),
          "text-blue-950": isActive(),
          "text-gray-200": !isActive()
        }}
      >
        {stepIndex + 1}
      </span>
      <div class="hidden [ sm:block sm:flex-grow sm:max-w-[150px] ]">
        <p class="font-medium text-sm text-white/50">
          STEP {stepIndex + 1}
        </p>
        <p class="font-bold uppercase text-gray-200">{title}</p>
      </div>
    </div>
  )
}

export default StepBlock;