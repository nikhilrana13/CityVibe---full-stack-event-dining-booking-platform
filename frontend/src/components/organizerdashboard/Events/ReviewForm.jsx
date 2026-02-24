import { formatDate,formatDuration} from '../../../lib/utils';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const ReviewForm = () => {
    const { watch } = useFormContext();
    const data = watch();


    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            {/* Event preview Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left - Event Info */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="text-xl font-semibold">{data.title}</h3>
                            <p className="text-gray-400 text-sm">{data.category}</p>
                        </div>

                        <div className="text-sm text-gray-300">
                            <p>📅{formatDate(data.startDate)} • {data.starttime}</p>
                            <p>📍{data.venue},{data.city}</p>
                            <p>⏳ {formatDuration(Number(data.duration))}</p>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-gray-300">
                            {data.description}
                        </div>

                    </div>

                    {/* Right - Cover Placeholder */}
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 flex items-center justify-center h-48">
                        {data.coverimage && data.coverimage[0] ? (
                            <img
                                src={URL.createObjectURL(data.coverimage[0])}
                                alt="cover"
                                className="w-full h-full rounded-md object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Event Cover Preview
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {/* tickets */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-6">Tickets Overview</h3>
                <div className="space-y-4">
                    {/* Ticket Row */}
                    {data.tickets?.map((ticket, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                        >
                            <div>
                                <p className="font-medium">{ticket.name}</p>
                                <p className="text-xs text-gray-400">
                                    {ticket.totalQuantity} Tickets • {ticket.paxCount} Pax
                                </p>
                            </div>
                            <span className="font-semibold text-indigo-400">
                                ₹{ticket.price}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/*Artist*/}
            {data.artists?.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-lg font-semibold mb-6">Artist Lineup</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.artists.map((artist, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
                            >
                                {artist.artistimage ? (
                                    <img
                                        src={URL.createObjectURL(artist.artistimage)}
                                        alt="artist"
                                        className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                                    />
                                ) : (
                                    <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/30 flex items-center justify-center text-sm text-gray-400 mb-3">
                                        Image
                                    </div>
                                )}

                                <p className="font-medium">{artist.name}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {artist.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default ReviewForm