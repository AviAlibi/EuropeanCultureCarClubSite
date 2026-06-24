"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type Member = {
	id: number;
	name: string;
	imageUrl: string;
	carModel: string;
};

const members: Member[] = [
	{
		id: 1,
		name: "Elena Petrova",
		carModel: "Porsche 911 Carrera",
		imageUrl:
			"https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 2,
		name: "Luca Moretti",
		carModel: "Alfa Romeo Giulia",
		imageUrl:
			"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 3,
		name: "Marta Kowalska",
		carModel: "BMW M4",
		imageUrl:
			"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
	},
	{
		id: 4,
		name: "Jonas Richter",
		carModel: "BMW M4",
		imageUrl:
			"https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

const SWIPE_THRESHOLD_PX = 40;
const TRANSITION_MS = 620;

function logicalFromTrackIndex(trackIndex: number, total: number) {
	if (trackIndex === 0) {
		return total - 1;
	}
	if (trackIndex === total + 1) {
		return 0;
	}
	return trackIndex - 1;
}

export default function MemberCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [trackIndex, setTrackIndex] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [useTransition, setUseTransition] = useState(true);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);

	const trackSlides = useMemo(() => {
		const head = members[members.length - 1];
		const tail = members[0];
		return [head, ...members, tail];
	}, []);

	const activeMember = members[activeIndex];

	const transitionToTrackIndex = (targetTrackIndex: number) => {
		if (isAnimating) {
			return;
		}

		setUseTransition(true);
		setTrackIndex(targetTrackIndex);
		setActiveIndex(logicalFromTrackIndex(targetTrackIndex, members.length));
		setIsAnimating(true);
	};

	const requestStep = (step: 1 | -1) => {
		if (isAnimating) {
			return;
		}

		transitionToTrackIndex(trackIndex + step);
	};

	const goToPrevious = () => {
		requestStep(-1);
	};

	const goToNext = () => {
		requestStep(1);
	};

	const onTrackTransitionEnd = () => {
		let nextTrackIndex = trackIndex;

		if (trackIndex === 0) {
			nextTrackIndex = members.length;
		} else if (trackIndex === members.length + 1) {
			nextTrackIndex = 1;
		}

		if (nextTrackIndex !== trackIndex) {
			setUseTransition(false);
			setTrackIndex(nextTrackIndex);
			setActiveIndex(logicalFromTrackIndex(nextTrackIndex, members.length));
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setUseTransition(true);
				});
			});
		}

		setIsAnimating(false);
	};

	const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
		setTouchStartX(event.changedTouches[0]?.clientX ?? null);
	};

	const onTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
		if (touchStartX === null) {
			return;
		}

		const endX = event.changedTouches[0]?.clientX ?? touchStartX;
		const delta = endX - touchStartX;

		if (delta <= -SWIPE_THRESHOLD_PX) {
			goToNext();
		} else if (delta >= SWIPE_THRESHOLD_PX) {
			goToPrevious();
		}

		setTouchStartX(null);
	};

	return (
		<section
			className="relative overflow-hidden rounded-xl border border-white/15 shadow-[0_18px_46px_rgba(0,0,0,0.45)]"
			style={{ height: "calc((100svh - 56px) * 0.4)", minHeight: "280px" }}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			aria-label="Car club members carousel"
		>
			<div className="absolute inset-0">
				<div
					className="flex h-full"
					onTransitionEnd={onTrackTransitionEnd}
					style={{
						width: `${trackSlides.length * 100}%`,
						transform: `translateX(-${(trackIndex * 100) / trackSlides.length}%)`,
						transition: useTransition
							? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
							: "none",
					}}
				>
					{trackSlides.map((member, index) => (
						<div
							key={`${member.id}-${index}`}
							className="relative h-full"
							style={{ width: `${100 / trackSlides.length}%` }}
						>
							<Image
								src={member.imageUrl}
								alt={`${member.name} - ${member.carModel}`}
								fill
								sizes="100vw"
								unoptimized
								className="object-cover"
								draggable={false}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/55" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

			<button
				type="button"
				onClick={goToPrevious}
				className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition hover:bg-black/55"
				aria-label="Previous member"
			>
				<ChevronLeft size={22} />
			</button>

			<button
				type="button"
				onClick={goToNext}
				className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition hover:bg-black/55"
				aria-label="Next member"
			>
				<ChevronRight size={22} />
			</button>

			<div className="absolute bottom-4 left-4 transition-all duration-300 ease-out sm:bottom-5 sm:left-5">
				<p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/80">
					Member Spotlight
				</p>
				<h2 className="text-2xl font-bold leading-none text-white sm:text-3xl">
					{activeMember.name}
				</h2>
				<p className="mt-1 text-sm text-white/85 sm:text-base">{activeMember.carModel}</p>
			</div>

			<div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-5 sm:right-5">
				{members.map((member, index) => (
					<button
						key={member.id}
						type="button"
						onClick={() => transitionToTrackIndex(index + 1)}
						aria-label={`Go to ${member.name}`}
						className={`h-1.5 rounded-full transition-all ${
							index === activeIndex ? "w-8 bg-white" : "w-4 bg-white/45"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
