interface ChangeQuantitySelectionProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ChangeQuantitySelection = ({
  quantity,
  onIncrement,
  onDecrement,
}: ChangeQuantitySelectionProps) => {
  return (
    <div className="flex w-fit items-center gap-3 rounded border border-primary-100 px-4 py-3">
      <button className="relative flex h-4 w-4" onClick={onDecrement}>
        <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
      </button>
      <span className="w-4 text-center text-primary-500 font-geometria">{quantity}</span>
      <button className="relative flex h-4 w-4" onClick={onIncrement}>
        <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
        <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-primary-300" />
      </button>
    </div>
  );
};

export default ChangeQuantitySelection;
