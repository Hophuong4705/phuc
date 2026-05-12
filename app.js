// ── DATA ──
// data.js
const MODULES = [
    { id: "emotion", name: "Cảm xúc & Xung đột", icon: "💔", color: "var(--accent-pink)", count: "5 Tình huống" },
    { id: "finance", name: "Tài chính & Áp lực", icon: "💰", color: "var(--accent-orange)", count: "2 Tình huống" },
    { id: "family", name: "Gia đình & Kết nối", icon: "👨‍👩‍👧", color: "var(--accent-cyan)", count: "5 Tình huống" }
];

const INSIGHTS = {
    reason: { pos: "Lý trí vững vàng giúp phân tích vấn đề khách quan.", neg: "Thiếu lý trí dễ dẫn đến những quyết định sai lầm." },
    empathy: { pos: "Sự thấu cảm cao giúp đối phương cảm thấy được lắng nghe.", neg: "Cần đặt mình vào vị trí của người kia nhiều hơn." },
    control: { pos: "Khả năng kiềm chế tốt, giữ được hòa khí.", neg: "Kiểm soát bốc đồng yếu, dễ buông lời tổn thương." },
    comm: { pos: "Kỹ năng giao tiếp là chìa khóa tháo gỡ mọi nút thắt.", neg: "Cần học cách diễn đạt nhu cầu thay vì chỉ trích." },
    finance: { pos: "Quản trị tài chính thông minh, minh bạch.", neg: "Cần có kế hoạch và tiếng nói chung về tiền bạc." },
    bond: { pos: "Sự gắn kết bền chặt, luôn hướng về nhau.", neg: "Khoảng cách đang lớn dần, cần ưu tiên vun đắp tình cảm." }
};

const SCENARIOS = [
    // ====================================================
    // CHỦ ĐỀ 1: CẢM XÚC & XUNG ĐỘT (5 Tình huống)
    // ====================================================
    {
        id: "s1",
        title: "Nghi ngờ ngoại tình",
        icon: "🧠",
        module: "emotion",
        desc: "Dạo gần đây bạn thấy người yêu hay giấu điện thoại, nhắn tin lúc khuya rồi quay lưng lại. Cảm giác 'có gì đó không ổn' cứ ám ảnh bạn mỗi ngày.",
        choices: [
            {
                id: "A",
                text: "Hỏi thẳng luôn cho rõ",
                effect: { reason: 10, control: -10, comm: -5 },
                next: {
                    desc: "Họ bất ngờ, hơi phòng thủ",
                    choices: [
                        {
                            id: "A1",
                            text: "Hỏi dồn dập, không cho họ giải thích",
                            effect: { empathy: -15, control: -20, comm: -15 },
                            next: {
                                desc: "Họ bắt đầu khó chịu",
                                choices: [
                                    {
                                        id: "A1a",
                                        text: "Họ cáu và phản công lại",
                                        effect: { control: -20, bond: -15 },
                                        scoreBonus: -15,
                                        result: {
                                            short: "Hai người cãi nhau rất lớn",
                                            long: "Khoảng cách cảm xúc tăng dần — mất an toàn trong mối quan hệ là hậu quả kéo dài nhất.",
                                            insight: "Hỏi dồn là phòng thủ, không phải giao tiếp. Thử câu 'Tôi đang lo lắng, em có thể chia sẻ không?' thay vì 'Anh/chị đang giấu gì?'"
                                        }
                                    },
                                    {
                                        id: "A1b",
                                        text: "Họ im lặng, bỏ đi không nói gì",
                                        effect: { comm: -20, bond: -20 },
                                        scoreBonus: -10,
                                        result: {
                                            short: "Bạn hoang mang, nghi ngờ càng tăng",
                                            long: "Thiếu tin tưởng nghiêm trọng — mối quan hệ dễ rơi vào vòng xoáy nghi ngờ không hồi kết.",
                                            insight: "Im lặng sau xung đột cần được phá vỡ bằng sự an toàn, không phải áp lực."
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            id: "A2",
                            text: "Cố giữ bình tĩnh khi hỏi",
                            effect: { control: 15, comm: 10 },
                            next: {
                                desc: "Họ bắt đầu giải thích",
                                choices: [
                                    {
                                        id: "A2a",
                                        text: "Vẫn nghi ngờ, bắt đầu kiểm tra điện thoại",
                                        effect: { reason: -15, control: -10, bond: -20 },
                                        scoreBonus: -15,
                                        result: {
                                            short: "Phát hiện thêm hoặc tự dằn vặt mình",
                                            long: "Dù có hay không có bằng chứng — hành động kiểm tra điện thoại thường làm tổn thương cả hai người.",
                                            insight: "Kiểm soát thông tin không bằng xây dựng môi trường an toàn để cả hai tự nguyện chia sẻ."
                                        }
                                    },
                                    {
                                        id: "A2b",
                                        text: "Chọn tin tưởng và buông bỏ nghi ngờ",
                                        effect: { empathy: 15, reason: 10, bond: 20 },
                                        scoreBonus: 15,
                                        result: {
                                            short: "Nhẹ lòng — mối quan hệ có cơ hội hồi phục",
                                            long: "Niềm tin được trao — nếu lý do là thật, đây là nền tảng để cả hai gắn kết hơn từng ngày.",
                                            insight: "Trao niềm tin là hành động dũng cảm. Nếu nó bị phản bội, bạn sẽ biết mình cần làm gì."
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            id: "A3",
                            text: "Mất kiểm soát, nói những câu rất nặng",
                            effect: { control: -30, empathy: -20, bond: -20 },
                            scoreBonus: -20,
                            result: {
                                short: "Không khí cực kỳ căng, cả hai tổn thương",
                                long: "Những câu nói trong lúc mất kiểm soát thường để lại vết thương lâu nhất — đôi khi không lành được.",
                                insight: "Khi nhận thấy bản thân sắp 'bùng', hãy nói: 'Cho tôi 10 phút để bình tĩnh lại.' Đây là kỹ năng quan trọng."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Chọn lúc phù hợp, nói chuyện nhẹ nhàng",
                effect: { reason: 15, control: 20, comm: 20, empathy: 15 },
                next: {
                    desc: "Họ có vẻ cởi mở hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Họ thừa nhận có vấn đề thật",
                            effect: { comm: 10, empathy: 10 },
                            next: {
                                desc: "Bạn sốc nhưng biết sự thật",
                                choices: [
                                    {
                                        id: "B1a",
                                        text: "Cùng đặt lại ranh giới, xây dựng lại niềm tin",
                                        effect: { reason: 20, bond: 20, comm: 20 },
                                        scoreBonus: 20,
                                        result: {
                                            short: "Mối quan hệ trưởng thành và bền vững hơn",
                                            long: "Đối diện sự thật và cùng nhau vượt qua — đây là dấu hiệu của tình yêu thật sự trưởng thành.",
                                            insight: "Ranh giới rõ ràng + cam kết thay đổi = công thức hồi phục niềm tin hiệu quả nhất."
                                        }
                                    },
                                    {
                                        id: "B1b",
                                        text: "Không vượt qua được, chia tay nhẹ nhàng",
                                        effect: { reason: 15, control: 15, comm: 10 },
                                        scoreBonus: 10,
                                        result: {
                                            short: "Ít tổn thương hơn cách chia tay thông thường",
                                            long: "Kết thúc trong tôn trọng là điều không phải ai cũng làm được — đó là sự dũng cảm.",
                                            insight: "Biết khi nào cần buông bỏ — cũng là một hình thức yêu bản thân."
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            id: "B2",
                            text: "Họ phủ nhận và chối thẳng",
                            effect: { reason: -10, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Bạn hoang mang hơn trước khi hỏi",
                                long: "Khi câu trả lời không thỏa đáng, hãy tin vào cảm xúc của mình và tiếp tục quan sát thêm.",
                                insight: "Cảm xúc của bạn là dữ liệu hợp lệ — đừng bác bỏ chúng chỉ vì người kia phủ nhận."
                            }
                        },
                        {
                            id: "B3",
                            text: "Họ né tránh, câu chuyện bị bỏ lửng",
                            effect: { comm: -15, bond: -10 },
                            scoreBonus: -5,
                            result: {
                                short: "Vấn đề treo lơ lửng, không được giải quyết",
                                long: "Né tránh chỉ trì hoãn — không giải quyết. Hãy tìm lúc khác phù hợp hơn để tiếp tục.",
                                insight: "Đặt lịch cụ thể cho cuộc trò chuyện thay vì để nó 'tự nhiên xảy ra' — hiệu quả hơn nhiều."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Im lặng, tự quan sát thêm",
                effect: { control: 10, comm: -20, empathy: -10 },
                next: {
                    desc: "Bạn suy nghĩ quá nhiều mỗi ngày",
                    choices: [
                        {
                            id: "C1",
                            text: "Thấy thêm dấu hiệu → bùng nổ mạnh hơn",
                            effect: { control: -25, bond: -20 },
                            scoreBonus: -15,
                            result: {
                                short: "Cảm xúc dồn nén → xung đột cực lớn",
                                long: "Càng chờ, cảm xúc càng tích tụ và dễ gây ra những điều khó kiểm soát về sau.",
                                insight: "Nén cảm xúc là vay nợ tâm lý — lãi suất tăng theo thời gian."
                            }
                        },
                        {
                            id: "C2",
                            text: "Không có gì rõ, bắt đầu tự nghi ngờ bản thân",
                            effect: { reason: -15, empathy: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Lo âu kéo dài, mất tự tin vào mình",
                                long: "Nghi ngờ chính cảm nhận của bản thân — đây là dấu hiệu bạn đang cần một cuộc trò chuyện thật sự.",
                                insight: "Nếu bạn liên tục tự hỏi 'mình có đang quá nhạy cảm không?' — câu trả lời thường là không."
                            }
                        },
                        {
                            id: "C3",
                            text: "Tưởng tượng nhiều thứ, kiệt sức",
                            effect: { reason: -20, control: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Mệt mỏi từ bên trong, không ngủ được",
                                long: "Tâm trí bạn đang làm việc quá tải — hãy cho bản thân một cuộc trò chuyện thật, dù sợ.",
                                insight: "Sự không chắc chắn thường đau hơn sự thật — dù sự thật có khó đến đâu."
                            }
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "s5",
        title: "Khác nhau về cách sống",
        icon: "🌀",
        module: "emotion",
        desc: "Bạn thích ổn định, kế hoạch rõ ràng. Người kia thích tự do, thay đổi liên tục. Sự khác nhau bắt đầu tạo ra ma sát ngày càng rõ.",
        choices: [
            {
                id: "A",
                text: "Muốn họ thay đổi để giống mình hơn",
                effect: { empathy: -20, control: -10, comm: -10 },
                scoreBonus: -10,
                result: {
                    short: "Họ thấy bị ép buộc, không thoải mái",
                    long: "Không ai nên từ bỏ bản sắc của mình vì tình yêu — tìm điểm dung hòa thay vì yêu cầu thay đổi.",
                    insight: "Câu hỏi đáng suy nghĩ: 'Tôi muốn họ thay đổi vì tôi, hay vì điều đó tốt cho họ?' Hai câu hỏi rất khác nhau."
                }
            },
            {
                id: "B",
                text: "Chấp nhận sự khác nhau, tìm điểm chung",
                effect: { reason: 15, empathy: 20, comm: 15, bond: 15 },
                next: {
                    desc: "Không khí nhẹ nhàng, cởi mở hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Hai người học cách dung hòa cả hai phong cách",
                            effect: { reason: 20, empathy: 20, bond: 25 },
                            scoreBonus: 20,
                            result: {
                                short: "Mối quan hệ phong phú và thú vị hơn nhiều",
                                long: "Sự khác biệt không phải vấn đề — cách hai người phản ứng với nó mới thực sự là vấn đề.",
                                insight: "Khác nhau về phong cách sống có thể bổ sung cho nhau: người thích ổn định + người thích mới mẻ = hành trình thú vị hơn."
                            }
                        },
                        {
                            id: "B2",
                            text: "Có lúc vẫn khó chịu nhưng cùng cố gắng",
                            effect: { control: 15, empathy: 10 },
                            scoreBonus: 10,
                            result: {
                                short: "Tiến trình không thẳng nhưng đúng hướng",
                                long: "Chấp nhận không có nghĩa là không bao giờ khó chịu — mà là chọn hiểu hơn chọn phán xét.",
                                insight: "Kỳ vọng thực tế: Không có cặp đôi nào 'hoàn toàn hòa hợp' — sự hòa hợp là thứ cả hai cùng xây dựng."
                            }
                        },
                        {
                            id: "B3",
                            text: "Đặt ranh giới rõ ràng cho từng người",
                            effect: { reason: 20, comm: 20, bond: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Ranh giới lành mạnh tạo ra tự do trong tình yêu",
                                long: "Biết điều gì không thể thỏa hiệp giúp cả hai tránh xung đột không cần thiết về sau.",
                                insight: "Ranh giới lành mạnh: Không phải bức tường ngăn cách — mà là cánh cửa bạn có thể chọn mở hay đóng."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Né tránh, giả vờ như không có vấn đề gì",
                effect: { control: -10, comm: -20, bond: -15 },
                scoreBonus: -10,
                result: {
                    short: "Mâu thuẫn âm ỉ rồi sẽ bùng lên",
                    long: "Những điều không được nói ra không biến mất — chúng âm thầm định hình hành vi và cảm xúc.",
                    insight: "Giả vờ thường đến từ sợ xung đột — nhưng xung đột lành mạnh lại là dấu hiệu của mối quan hệ khỏe mạnh."
                }
            }
        ]
    },
    {
        id: "s6",
        title: "Ghen tuông",
        icon: "😡",
        module: "emotion",
        desc: "Bạn thấy người yêu nói chuyện khá thân mật với người khác. Cảm giác không thoải mái xuất hiện và ngày càng lớn dần trong lòng bạn.",
        choices: [
            {
                id: "A",
                text: "Kiểm soát họ, hạn chế giao tiếp của họ",
                effect: { reason: -15, control: -25, bond: -20 },
                scoreBonus: -15,
                result: {
                    short: "Họ phản kháng hoặc bắt đầu giấu giếm",
                    long: "Kiểm soát xuất phát từ sợ hãi — nhưng nó thường tạo ra chính điều bạn đang sợ nhất.",
                    insight: "Nghịch lý kiểm soát: Bạn kiểm soát người khác vì sợ mất họ — nhưng kiểm soát chính là thứ khiến họ muốn rời đi."
                }
            },
            {
                id: "B",
                text: "Nói thật về cảm xúc của mình",
                effect: { reason: 15, comm: 25, empathy: 15 },
                next: {
                    desc: "Họ hiểu và đồng cảm với bạn hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Họ trấn an và giải thích rõ ràng",
                            effect: { bond: 25, comm: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Niềm tin được củng cố vững chắc hơn",
                                long: "Ghen tuông lành mạnh là tín hiệu — nói ra và được trấn an là cách xử lý tốt và lành mạnh nhất.",
                                insight: "Câu nói hiệu quả: 'Em cảm thấy không an tâm khi... Em cần được biết rằng...' — không phải cáo buộc, mà là chia sẻ."
                            }
                        },
                        {
                            id: "B2",
                            text: "Hai người hiểu nhau hơn về ranh giới",
                            effect: { reason: 20, comm: 25, bond: 20 },
                            scoreBonus: 20,
                            result: {
                                short: "Mối quan hệ rõ ràng và an toàn hơn nhiều",
                                long: "Cuộc trò chuyện về ranh giới là một trong những cuộc trò chuyện quan trọng nhất trong tình yêu.",
                                insight: "Mỗi người có ranh giới khác nhau — không cần ai phải từ bỏ ranh giới của mình, chỉ cần hiểu và tôn trọng."
                            }
                        },
                        {
                            id: "B3",
                            text: "Cần thêm thời gian để xây dựng niềm tin",
                            effect: { control: 15, comm: 10 },
                            scoreBonus: 10,
                            result: {
                                short: "Đang đi đúng hướng, tiếp tục",
                                long: "Niềm tin không thể ép buộc — nhưng được nuôi dưỡng qua những hành động nhất quán mỗi ngày.",
                                insight: "Niềm tin được xây bằng: Nhất quán + Minh bạch + Sẵn lòng lắng nghe lo lắng của nhau."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Giữ trong lòng, không nói ra với ai",
                effect: { control: 5, comm: -20, empathy: -20 },
                scoreBonus: -10,
                result: {
                    short: "Tự mệt mỏi rồi bùng nổ về sau",
                    long: "Cảm xúc ghen tuông cần được xử lý — trước khi nó trở thành bức tường ngăn cách hai người.",
                    insight: "Bước đầu tiên: Hỏi bản thân 'Ghen tuông này đang nói với tôi điều gì về nỗi sợ của mình?' — trả lời trước khi hành động."
                }
            }
        ]
    },
    {
        id: "s9",
        title: "Cảm giác hết yêu",
        icon: "💔",
        module: "emotion",
        desc: "Bạn bắt đầu thấy tình cảm không còn như trước. Những cảm xúc quen thuộc dần phai nhạt — và bạn không còn chắc mình còn yêu nữa hay không.",
        choices: [
            {
                id: "A",
                text: "Chia tay luôn, không muốn kéo dài",
                effect: { reason: 10, bond: -20 },
                next: {
                    desc: "Quyết định rõ ràng đã được đưa ra",
                    choices: [
                        {
                            id: "A1",
                            text: "Bạn cảm thấy nhẹ nhõm sau đó",
                            effect: { reason: 15, empathy: 10 },
                            scoreBonus: 10,
                            result: {
                                short: "Quyết định đúng đắn cho bản thân bạn",
                                long: "Đôi khi dứt khoát là hành động tử tế nhất cho cả hai — sống thật với cảm xúc là điều dũng cảm.",
                                insight: "Sự nhẹ nhõm sau chia tay thường xác nhận quyết định là đúng — dù cũng có những lúc đau khi nhớ lại."
                            }
                        },
                        {
                            id: "A2",
                            text: "Bạn bắt đầu hối hận và tiếc nuối",
                            effect: { reason: -10, empathy: -15 },
                            scoreBonus: -5,
                            result: {
                                short: "Hối hận vì quyết định có thể quá vội vàng",
                                long: "Cảm giác 'hết yêu' đôi khi chỉ là kiệt sức — không phải kết thúc. Đáng được suy nghĩ kỹ hơn.",
                                insight: "Hối hận không có nghĩa là quyết định sai — có thể chỉ là bạn đang đau. Cho bản thân thời gian để phân biệt hai điều này."
                            }
                        },
                        {
                            id: "A3",
                            text: "Cả hai tổn thương nhưng hiểu nhau hơn",
                            effect: { reason: 15, comm: 20, empathy: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Kết thúc trong tôn trọng và hiểu biết",
                                long: "Chia tay trong hiểu biết là điều hiếm có — nó cho phép cả hai tiếp tục không mang theo vết thương.",
                                insight: "Kết thúc tốt đẹp cũng là di sản mà mối quan hệ để lại — không chỉ những kỷ niệm khi còn bên nhau."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Thử cứu vãn trước khi đưa ra quyết định",
                effect: { reason: 10, comm: 20, bond: 15 },
                next: {
                    desc: "Mối quan hệ có cơ hội được hồi sinh",
                    choices: [
                        {
                            id: "B1",
                            text: "Tình cảm dần quay trở lại",
                            effect: { bond: 25, empathy: 20, comm: 20 },
                            scoreBonus: 25,
                            result: {
                                short: "Mối quan hệ được hồi sinh mạnh mẽ",
                                long: "Tình yêu có thể mờ dần rồi bùng lên lại — nếu cả hai cùng chọn nhau và nỗ lực cùng nhau.",
                                insight: "Các nhà tâm lý học gọi đây là 'giai đoạn ổn định' — tình yêu đỉnh cao ban đầu là tạm thời, tình yêu trưởng thành là lựa chọn."
                            }
                        },
                        {
                            id: "B2",
                            text: "Nhận ra hai người thật sự không hợp",
                            effect: { reason: 20, comm: 15 },
                            scoreBonus: 10,
                            result: {
                                short: "Chia tay trong hiểu biết sâu sắc hơn",
                                long: "Cố gắng hết sức rồi quyết định — không phải thất bại, mà là sự trưởng thành đáng trân trọng.",
                                insight: "Cố gắng rồi buông bỏ khác hoàn toàn với buông bỏ mà không thử — cái trước là trưởng thành, cái sau là hối tiếc."
                            }
                        },
                        {
                            id: "B3",
                            text: "Bạn trưởng thành hơn qua quá trình này",
                            effect: { reason: 15, empathy: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Bài học quý giá về bản thân và tình yêu",
                                long: "Dù kết quả thế nào, việc cố gắng thật sự dạy bạn rất nhiều điều về chính mình.",
                                insight: "Mỗi mối quan hệ — dù kết thúc thế nào — đều là một phần của hành trình tự hiểu bản thân sâu sắc hơn."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Cứ để vậy, không muốn quyết định gì",
                effect: { reason: -15, control: -10, bond: -15 },
                scoreBonus: -10,
                result: {
                    short: "Mệt mỏi kéo dài, tổn thương âm ỉ",
                    long: "Ở lại mà không có lý do để ở lại — là hình thức giam cầm cả hai trong sự trì trệ không lối thoát.",
                    insight: "Sợ quyết định sai thường khiến chúng ta không quyết định — nhưng không quyết định cũng là một quyết định."
                }
            }
        ]
    },
    {
        id: "TC02",
        title: "Xung đột Tính cách và Sinh hoạt",
        icon: "🧹",
        module: "emotion",
        desc: "Sau 6 tháng kết hôn, thói quen xấu bộc lộ. Vợ (Mai) kỹ tính, ưa sạch sẽ. Chồng (Hùng) khá bừa bộn và vô tâm. Hôm nay Mai đi làm về rất mệt, thấy Hùng đang ngồi chơi game, quần áo vứt trên sô-pha, bát đĩa ăn xong chưa rửa.",
        choices: [
            {
                id: "A",
                text: "Tức giận quát lớn: 'Anh coi cái nhà này là cái bãi rác à? Có mỗi việc dọn dẹp cũng không xong!'",
                effect: { control: -25, comm: -15, empathy: -10 },
                next: {
                    desc: "Hùng tự ái, cãi lại: 'Anh cũng đi làm cả ngày mệt mỏi, vừa mới ngồi nghỉ cô đã cằn nhằn. Thích sạch thì tự dọn!'. Cả hai cãi nhau to. Bạn làm gì tiếp?",
                    choices: [
                        {
                            id: "A1",
                            text: "Quét sạch đồ đạc của Hùng xuống đất, bỏ vào phòng đóng sầm cửa lại.",
                            effect: { control: -30, bond: -20 },
                            scoreBonus: -20,
                            result: {
                                short: "Chiến tranh lạnh kéo dài",
                                long: "Hành động tiêu cực đẩy mâu thuẫn lên đỉnh điểm, tổn thương lòng tự trọng của nhau.",
                                insight: "Sự tức giận chỉ giải tỏa được 1 phút nhưng để lại hậu quả nhiều ngày."
                            }
                        },
                        {
                            id: "A2",
                            text: "Im lặng, hít thở sâu, đi uống nước rồi bảo: 'Em xin lỗi vì đã lớn tiếng, em thực sự đang quá tải.'",
                            effect: { control: 20, comm: 20, empathy: 15 },
                            scoreBonus: 10,
                            result: {
                                short: "Xung đột được kiểm soát",
                                long: "Hùng dịu lại và tắt game đi dọn. Biết lùi một bước đúng lúc là sự thông minh trong hôn nhân.",
                                insight: "Thừa nhận sự quá tải của bản thân giúp đối phương chuyển từ 'phòng thủ' sang 'cảm thông'."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Không nói câu nào. Cầm chổi đi dọn, cố tình tạo ra tiếng động lớn để Hùng tự hiểu.",
                effect: { control: -10, comm: -20, bond: -10 },
                next: {
                    desc: "Hùng lơ đi vì ngại cãi nhau. Tối đó đi ngủ, bạn mang cục tức trong người. Sáng hôm sau, bầu không khí rất ngột ngạt. Bạn sẽ làm gì?",
                    choices: [
                        {
                            id: "B1",
                            text: "Tiếp tục 'chiến tranh lạnh', không thèm nói chuyện cho đến khi chồng tự biết lỗi.",
                            effect: { comm: -25, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Khoảng cách ngày càng lớn",
                                long: "Sự im lặng giết chết hôn nhân. Không ai tự hiểu được nếu bạn không nói ra.",
                                insight: "Đừng bắt đối phương phải chơi trò 'đoán ý'. Giao tiếp là chìa khóa duy nhất."
                            }
                        },
                        {
                            id: "B2",
                            text: "Chủ động nói: 'Tối qua em rất buồn vì thấy anh không phụ giúp việc nhà. Từ nay mình phân chia việc nhé.'",
                            effect: { reason: 15, comm: 25, bond: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Đối phương nhận ra vấn đề và sửa đổi",
                                long: "Giao tiếp thẳng thắn giúp tháo gỡ cục diện bế tắc một cách nhanh chóng.",
                                insight: "Chủ động nói ra vấn đề không phải là 'thua', mà là người làm chủ mối quan hệ."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Hít sâu. Lại gần nói nhẹ nhàng: 'Chồng ơi, em nay đi làm về đuối quá. Anh chơi xong ván này thì phụ em rửa bát nhé.'",
                effect: { control: 20, comm: 25, reason: 10 },
                next: {
                    desc: "Hùng gật đầu. 15 phút sau dọn xong nhưng chưa được sạch sẽ gọn gàng đúng ý bạn lắm. Bạn phản ứng sao?",
                    choices: [
                        {
                            id: "C1",
                            text: "Cằn nhằn: 'Anh dọn thế này thà để em tự dọn còn hơn, làm cái gì cũng không nên hồn!'",
                            effect: { control: -15, empathy: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Triệt tiêu sự cố gắng",
                                long: "Phê phán công sức của đối phương sẽ khiến họ không bao giờ muốn phụ giúp bạn lần nữa.",
                                insight: "Khi bạn cầu toàn quá mức, bạn sẽ tự biến mình thành người làm tất cả mọi việc."
                            }
                        },
                        {
                            id: "C2",
                            text: "Vui vẻ nói: 'Cảm ơn chồng nhé, có anh đỡ đần em đỡ mệt hẳn.' Sau đó nhẹ nhàng hướng dẫn lại chỗ chưa sạch.",
                            effect: { empathy: 20, comm: 20, bond: 25 },
                            scoreBonus: 20,
                            result: {
                                short: "Hôn nhân hạnh phúc",
                                long: "Đối phương cảm thấy được ghi nhận và có động lực thay đổi tốt hơn vào lần sau.",
                                insight: "Lời khen ngợi có sức mạnh định hình hành vi gấp 10 lần lời chỉ trích."
                            }
                        }
                    ]
                }
            }
        ]
    },

    // ====================================================
    // CHỦ ĐỀ 2: TÀI CHÍNH & ÁP LỰC (2 Tình huống)
    // ====================================================
    {
        id: "s2",
        title: "Mâu thuẫn tiền bạc",
        icon: "💰",
        module: "finance",
        desc: "Hai người bắt đầu bàn chuyện cưới, nhưng bạn nhận ra cách tiêu tiền quá khác nhau — bạn muốn tiết kiệm trong khi người kia chi tiêu rất thoải mái.",
        choices: [
            {
                id: "A",
                text: "Nói thẳng: cách tiêu tiền đó là không ổn",
                effect: { reason: 10, control: -10, comm: -10 },
                next: {
                    desc: "Không khí trở nên căng ngay",
                    choices: [
                        {
                            id: "A1",
                            text: "Nói mạnh — họ phản ứng gay gắt",
                            effect: { control: -20, empathy: -15 },
                            next: {
                                desc: "Tranh luận leo thang",
                                choices: [
                                    {
                                        id: "A1a",
                                        text: "Ai cũng muốn thắng, không ai chịu nghe",
                                        effect: { control: -20, bond: -15 },
                                        scoreBonus: -15,
                                        result: {
                                            short: "Xung đột lặp đi lặp lại theo chu kỳ",
                                            long: "Mâu thuẫn tiền bạc không giải quyết bằng ai đúng hơn — mà bằng ai sẵn lòng lắng nghe trước.",
                                            insight: "Trong tranh cãi về tiền: bước đầu tiên là lắng nghe giá trị của người kia, không phải thuyết phục họ."
                                        }
                                    },
                                    {
                                        id: "A1b",
                                        text: "Một người nhượng bộ nhưng không thật lòng",
                                        effect: { comm: -15, empathy: -10 },
                                        scoreBonus: -10,
                                        result: {
                                            short: "Tạm yên nhưng bất mãn tích tụ dần",
                                            long: "Nhượng bộ để tránh tranh cãi không phải giải pháp — sẽ tái phát với mức độ lớn hơn.",
                                            insight: "Nhượng bộ giả tạo là lãi suất chờ trả — hãy nói thật cảm xúc của mình dù khó."
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            id: "A2",
                            text: "Cố giải thích bằng logic, tranh luận dài",
                            effect: { reason: 20, comm: 10, empathy: -5 },
                            scoreBonus: 5,
                            result: {
                                short: "Hiểu nhau hơn nhưng chưa đồng thuận",
                                long: "Ít nhất cả hai đều lắng nghe — đây là bước đầu cần thiết của mọi thỏa thuận bền vững.",
                                insight: "Logic tốt, nhưng hãy thêm sự đồng cảm. Hỏi: 'Tiền bạc có ý nghĩa gì với anh/em?'"
                            }
                        },
                        {
                            id: "A3",
                            text: "Áp đặt, muốn họ phải theo ý mình",
                            effect: { control: -15, empathy: -20, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Họ bề ngoài đồng ý, bên trong khó chịu",
                                long: "Kiểm soát tài chính của người khác thường dẫn đến sự phản kháng ngầm ngày càng lớn hơn.",
                                insight: "Kiểm soát tài chính là dạng kiểm soát tinh vi — cần phân biệt với 'quản lý tài chính chung'."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Ngồi nói chuyện bình tĩnh, tìm điểm chung",
                effect: { reason: 20, control: 15, comm: 25, empathy: 15, finance: 10 },
                next: {
                    desc: "Hai người hợp tác và cởi mở hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Cùng lập kế hoạch chi tiêu cụ thể",
                            effect: { reason: 25, finance: 30, bond: 20, comm: 20 },
                            scoreBonus: 20,
                            result: {
                                short: "Tài chính ổn định, cảm giác an toàn tăng",
                                long: "Có nguyên tắc chung về tiền bạc là nền tảng quan trọng nhất cho bất kỳ cuộc hôn nhân nào.",
                                insight: "Công cụ thực tế: Quy tắc 50/30/20 (nhu cầu/muốn/tiết kiệm) áp dụng cho thu nhập chung rất hiệu quả."
                            }
                        },
                        {
                            id: "B2",
                            text: "Chưa thống nhất — thử phương án trung gian",
                            effect: { reason: 15, comm: 15, finance: 10 },
                            scoreBonus: 10,
                            result: {
                                short: "Chấp nhận được, nhưng vẫn còn lấn cấn",
                                long: "Trung gian là điểm khởi đầu tốt — cần nói thêm nhiều lần để tìm ra điều thực sự phù hợp.",
                                insight: "Hãy thử: Quỹ chung cho chi phí thiết yếu, tài khoản riêng cho chi tiêu cá nhân — linh hoạt hơn nhiều."
                            }
                        },
                        {
                            id: "B3",
                            text: "Một người nhường nhiều để kết thúc",
                            effect: { empathy: -10, bond: -10 },
                            scoreBonus: -5,
                            result: {
                                short: "Có chút mất cân bằng trong quan hệ",
                                long: "Nhường quá nhiều trong thời gian dài tạo ra sự bất bình đẳng vô hình — cần theo dõi thêm.",
                                insight: "Cân bằng không có nghĩa là 50/50 mọi lúc — mà là cả hai đều cảm thấy được tôn trọng."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Thôi kệ, tránh đụng đến chủ đề tiền",
                effect: { finance: -15, comm: -20, bond: -10 },
                next: {
                    desc: "Tránh được căng thẳng nhất thời",
                    choices: [
                        {
                            id: "C1",
                            text: "Nợ và chi phí bắt đầu tích tụ",
                            effect: { finance: -30, control: -15, bond: -20 },
                            scoreBonus: -15,
                            result: {
                                short: "Đổ lỗi cho nhau khi mọi thứ vỡ ra",
                                long: "Vấn đề tài chính không tự biến mất — im lặng chỉ là lãi suất đang cộng dồn từng ngày.",
                                insight: "Thống kê: Tài chính là nguyên nhân hàng đầu của ly hôn — nói về tiền sớm là yêu nhau tốt hơn."
                            }
                        },
                        {
                            id: "C2",
                            text: "Mỗi người quản lý tiền theo kiểu riêng",
                            effect: { finance: -10, bond: -15, comm: -10 },
                            scoreBonus: -5,
                            result: {
                                short: "Xa cách dần về mặt thực tế cuộc sống",
                                long: "Tài chính là cuộc sống hàng ngày — không nói được về điều này sẽ khó nói về nhiều thứ khác.",
                                insight: "Tài chính riêng hoàn toàn sau hôn nhân có thể làm phai mờ cảm giác 'chúng ta' trong mối quan hệ."
                            }
                        },
                        {
                            id: "C3",
                            text: "Đến lúc lớn chuyện thì mọi thứ vỡ toang",
                            effect: { control: -25, finance: -25, bond: -25 },
                            scoreBonus: -20,
                            result: {
                                short: "Tổn thương nặng khi mâu thuẫn bùng phát",
                                long: "Mâu thuẫn bị chôn vùi thường tái hiện với cường độ gấp đôi khi không còn chịu được.",
                                insight: "Không bao giờ là 'quá trễ' để bắt đầu nói về tiền — nhưng sớm thì ít đau hơn nhiều."
                            }
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "s10",
        title: "Bị gia đình thúc cưới",
        icon: "🧾",
        module: "finance",
        desc: "Gia đình bắt đầu giục cưới liên tục, nhưng bạn chưa thấy bản thân sẵn sàng về tài chính. Áp lực từ nhiều phía đang ngày càng tăng lên.",
        choices: [
            {
                id: "A",
                text: "Cưới luôn cho xong, chiều ý mọi người",
                effect: { reason: -15, finance: -20, bond: -10 },
                scoreBonus: -15,
                result: {
                    short: "Nhanh nhưng rủi ro về lâu dài rất cao",
                    long: "Hôn nhân vì áp lực không phải nền tảng hạnh phúc — mâu thuẫn sau đám cưới thường nặng hơn rất nhiều.",
                    insight: "Đám cưới kéo dài 1 ngày — hôn nhân kéo dài cả đời. Quyết định dựa trên áp lực ngắn hạn cho hành trình dài hạn thường không hiệu quả."
                }
            },
            {
                id: "B",
                text: "Nói rõ ràng: mình cần thêm thời gian tích lũy",
                effect: { reason: 20, comm: 20, control: 15, finance: 10 },
                next: {
                    desc: "Quyết định trưởng thành và dũng cảm",
                    choices: [
                        {
                            id: "B1",
                            text: "Dành thời gian chuẩn bị kỹ càng hơn",
                            effect: { reason: 25, finance: 20, bond: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Vào hôn nhân với sự sẵn sàng thật sự",
                                long: "Thời gian chuẩn bị không phải trì hoãn — mà là tôn trọng quyết định quan trọng nhất cuộc đời.",
                                insight: "Chuẩn bị không phải là 'đợi đến khi mọi thứ hoàn hảo' — mà là hiểu rõ bản thân và người kia đủ để bước vào cùng nhau."
                            }
                        },
                        {
                            id: "B2",
                            text: "Hai người hiểu nhau sâu hơn trong giai đoạn đó",
                            effect: { empathy: 20, comm: 25, bond: 25 },
                            scoreBonus: 20,
                            result: {
                                short: "Mối quan hệ vững chắc hơn trước ngày cưới",
                                long: "Biết nhau thật sự trước khi kết hôn là món quà tốt nhất bạn có thể dành cho hôn nhân của mình.",
                                insight: "Những câu hỏi nên trả lời trước hôn nhân: Giá trị sống, kỳ vọng về vai trò, quan điểm về con cái, tài chính dài hạn."
                            }
                        },
                        {
                            id: "B3",
                            text: "Gia đình không đồng ý, tạo thêm áp lực",
                            effect: { control: 10, comm: 15, bond: 10 },
                            scoreBonus: 5,
                            result: {
                                short: "Giữ được giá trị bản thân dù rất khó",
                                long: "Đứng vững trước áp lực gia đình cần hai người cùng đứng — đây là bài kiểm tra quan trọng nhất.",
                                insight: "Cách gia đình phản ứng khi bạn đặt ranh giới — cũng cho bạn biết rất nhiều về động lực gia đình mà bạn sắp bước vào."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Từ chối thẳng, không muốn kết hôn lúc này",
                effect: { reason: 10, comm: 15, empathy: -5 },
                scoreBonus: 10,
                result: {
                    short: "Rõ ràng và trung thực với chính mình",
                    long: "Biết mình muốn gì và không muốn gì là sự trưởng thành — dù quyết định này dẫn đến thay đổi lớn.",
                    insight: "Trung thực với bản thân — trước khi trung thực với người khác — là nền tảng của bất kỳ mối quan hệ lành mạnh nào."
                }
            }
        ]
    },

    // ====================================================
    // CHỦ ĐỀ 3: GIA ĐÌNH & KẾT NỐI (5 Tình huống)
    // ====================================================
    {
        id: "s3",
        title: "Gia đình can thiệp",
        icon: "👨‍👩‍👧",
        module: "family",
        desc: "Gia đình người kia can thiệp thường xuyên vào chuyện riêng của hai bạn — từ những quyết định nhỏ đến những chuyện quan trọng nhất.",
        choices: [
            {
                id: "A",
                text: "Nói thẳng: tôi không thích điều này",
                effect: { control: -10, comm: -5, empathy: -10 },
                next: {
                    desc: "Người kia rơi vào tình huống khó xử",
                    choices: [
                        {
                            id: "A1",
                            text: "Họ đứng về phía gia đình — bạn thấy bị bỏ rơi",
                            effect: { bond: -25, empathy: -15 },
                            scoreBonus: -15,
                            result: {
                                short: "Mất niềm tin, xa cách về cảm xúc",
                                long: "Khi người yêu chọn gia đình trong mọi tình huống — đây là ranh giới cần được nói ra rõ ràng.",
                                insight: "Trong hôn nhân, gia đình riêng cần được ưu tiên — không phải bỏ qua gia đình gốc, mà là phân biệt rõ vai trò."
                            }
                        },
                        {
                            id: "A2",
                            text: "Họ hiểu nhưng không biết phải làm gì",
                            effect: { empathy: 10, comm: 10 },
                            scoreBonus: 5,
                            result: {
                                short: "Thông cảm nhưng vẫn áp lực mỗi ngày",
                                long: "Hiểu vấn đề là bước đầu — thay đổi cần thời gian và nỗ lực thực sự từ cả hai phía.",
                                insight: "Đưa ra đề xuất cụ thể thay vì chờ họ tự tìm cách — 'Em muốn chúng ta thống nhất trước khi chia sẻ với gia đình.'"
                            }
                        },
                        {
                            id: "A3",
                            text: "Hai người bắt đầu căng thẳng với nhau",
                            effect: { control: -15, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Không khí nặng nề và mệt mỏi",
                                long: "Vấn đề gia đình cần giải quyết như một đội — không phải đứng đối địch với nhau.",
                                insight: "Khi cả hai cảm thấy là đội cùng phía — vấn đề gia đình trở nên dễ giải quyết hơn nhiều."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Nói nhẹ nhàng, cùng tìm cách dung hòa",
                effect: { reason: 15, control: 15, comm: 20, empathy: 15 },
                next: {
                    desc: "Không khí nhẹ nhàng và hợp tác hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Hai người thống nhất đặt ranh giới với gia đình",
                            effect: { reason: 20, bond: 25, comm: 25 },
                            scoreBonus: 20,
                            result: {
                                short: "Gia đình dần tôn trọng — mối quan hệ vững hơn",
                                long: "Khi đôi bạn đứng cùng nhau và tôn trọng nhau — gia đình hai bên sẽ dần học cách điều chỉnh.",
                                insight: "Ranh giới với gia đình không phải 'xa cách' — mà là tôn trọng vai trò mới của mỗi người trong cuộc sống."
                            }
                        },
                        {
                            id: "B2",
                            text: "Chưa thống nhất, cần nói thêm nhiều lần",
                            effect: { control: 15, comm: 15 },
                            scoreBonus: 10,
                            result: {
                                short: "Có tiến triển nhưng cần rất nhiều kiên nhẫn",
                                long: "Vấn đề gia đình thường cần nhiều cuộc trò chuyện — điều quan trọng là không bỏ cuộc giữa chừng.",
                                insight: "Hãy kiên trì. Thay đổi ranh giới gia đình thường mất 6-12 tháng để ổn định — đó là bình thường."
                            }
                        },
                        {
                            id: "B3",
                            text: "Bạn phải nhẫn nhịn nhiều hơn",
                            effect: { control: 10, empathy: -10, bond: -5 },
                            scoreBonus: -5,
                            result: {
                                short: "Hòa khí tạm thời",
                                long: "Nhẫn nhịn có giới hạn — hãy đảm bảo bạn cũng được lắng nghe, không chỉ luôn nhường.",
                                insight: "Nhẫn nhịn lâu dài mà không được ghi nhận thường dẫn đến oán giận — hãy nói ra khi bạn cần."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Không nói gì, tự chịu đựng bên trong",
                effect: { control: -5, comm: -20, bond: -15 },
                next: {
                    desc: "Bề ngoài yên ổn, bên trong không",
                    choices: [
                        {
                            id: "C1",
                            text: "Bạn khó chịu ngày càng nhiều",
                            effect: { control: -15, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Một ngày nào đó sẽ bùng nổ",
                                long: "Cảm xúc bị nén lại không biến mất — chúng tìm cách thoát ra theo cách thường không đẹp.",
                                insight: "Thân thể bạn sẽ cho bạn biết khi cảm xúc tích tụ quá nhiều — đừng đợi đến lúc đó mới nói."
                            }
                        },
                        {
                            id: "C2",
                            text: "Gia đình can thiệp ngày càng nhiều hơn",
                            effect: { reason: -10, bond: -20 },
                            scoreBonus: -15,
                            result: {
                                short: "Ranh giới ngày càng mờ nhạt",
                                long: "Khi bạn không lên tiếng, người khác sẽ lấp đầy khoảng trống đó — đó là quy luật tự nhiên.",
                                insight: "Im lặng thường được đọc là 'đồng ý' — hãy nói ra dù chỉ là 'Tôi cần thêm thời gian để suy nghĩ về điều này.'"
                            }
                        },
                        {
                            id: "C3",
                            text: "Mọi thứ tích tụ rồi vỡ ra đột ngột",
                            effect: { control: -30, bond: -25 },
                            scoreBonus: -20,
                            result: {
                                short: "Tổn thương sâu và rất khó hàn gắn",
                                long: "Đỉnh điểm của sự im lặng thường là một cơn bùng phát không ai chuẩn bị trước được.",
                                insight: "Cơn bùng phát sau im lặng dài thường nói những điều 'tích lũy' — không chỉ vấn đề hiện tại. Rất khó để giải quyết."
                            }
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "s4",
        title: "Ít nói chuyện với nhau",
        icon: "💬",
        module: "family",
        desc: "Dạo này hai người nói chuyện ít hẳn — chủ yếu chỉ 'ăn chưa', 'đi đâu'. Không còn những cuộc trò chuyện thật sự nữa.",
        choices: [
            {
                id: "A",
                text: "Nói thẳng: tôi thấy tụi mình đang xa nhau",
                effect: { reason: 10, comm: 15, bond: 10 },
                next: {
                    desc: "Người kia khá bất ngờ",
                    choices: [
                        {
                            id: "A1",
                            text: "Họ lắng nghe và bắt đầu mở lòng",
                            effect: { empathy: 20, comm: 25, bond: 25 },
                            scoreBonus: 15,
                            result: {
                                short: "Kết nối được khơi lại tự nhiên",
                                long: "Đôi khi chỉ cần một người dũng cảm nói ra — điều đó có thể thay đổi rất nhiều.",
                                insight: "Câu nói đơn giản nhất để mở đầu: 'Gần đây anh/em đang nghĩ đến điều gì nhiều nhất?'"
                            }
                        },
                        {
                            id: "A2",
                            text: "Họ khó chịu, câu chuyện thành tranh cãi",
                            effect: { control: -15, comm: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Cố gắng kết nối nhưng đi lạc hướng",
                                long: "Thời điểm và cách nói rất quan trọng — thử lại vào lúc cả hai thực sự bình tĩnh hơn.",
                                insight: "Chọn thời điểm: Không phải khi vừa về nhà mệt, khi ăn, hay trước khi ngủ — mà là khi cả hai đang thực sự ổn."
                            }
                        },
                        {
                            id: "A3",
                            text: "Hai người hiểu sai ý nhau hoàn toàn",
                            effect: { comm: -15, empathy: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Ý tốt nhưng kết quả ngược lại",
                                long: "Giao tiếp là kỹ năng có thể học — đôi khi cần nói chuyện về cách mình nói chuyện với nhau.",
                                insight: "Thử kỹ thuật 'phản chiếu': Sau khi nghe, nói lại ý của người kia bằng lời mình — để chắc chắn hiểu đúng."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Chủ động rủ đi chơi, tạo kỷ niệm mới",
                effect: { empathy: 15, bond: 20, comm: 10 },
                next: {
                    desc: "Không khí nhẹ nhàng hơn",
                    choices: [
                        {
                            id: "B1",
                            text: "Hai người vui lại, kết nối trở lại tự nhiên",
                            effect: { bond: 30, empathy: 20, comm: 20 },
                            scoreBonus: 20,
                            result: {
                                short: "Mối quan hệ được hâm nóng trở lại",
                                long: "Kỷ niệm chung là nền tảng của mối quan hệ — hãy cố tạo thêm chúng mỗi tuần.",
                                insight: "Nghiên cứu cho thấy: Các cặp đôi dành ít nhất 2 giờ/tuần cho 'thời gian chất lượng' có mối quan hệ bền hơn 3 lần."
                            }
                        },
                        {
                            id: "B2",
                            text: "Chỉ vui lúc đó, về nhà lại như cũ",
                            effect: { reason: 10, bond: -5 },
                            scoreBonus: 5,
                            result: {
                                short: "Cần giải quyết gốc rễ sâu hơn",
                                long: "Vui chơi là thuốc bổ, không phải thuốc chữa — cần nói thật về khoảng cách đang có.",
                                insight: "Câu hỏi nên hỏi sau buổi đi chơi vui: 'Điều gì đang khiến mình ít nói chuyện với nhau hơn dạo gần đây?'"
                            }
                        },
                        {
                            id: "B3",
                            text: "Cần kiên trì dài lâu, không phải một lần",
                            effect: { reason: 15, comm: 15, bond: 15 },
                            scoreBonus: 10,
                            result: {
                                short: "Đang đi đúng hướng",
                                long: "Xây dựng thói quen kết nối mỗi ngày — dù nhỏ — quan trọng hơn những chuyến đi lớn.",
                                insight: "Thói quen nhỏ hiệu quả: Chia sẻ 1 điều tốt và 1 điều khó trong ngày mỗi tối trước khi ngủ."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Thôi kệ, ai cũng bận mà",
                effect: { bond: -15, comm: -20, empathy: -10 },
                next: {
                    desc: "Hai người dần xa nhau từng ngày",
                    choices: [
                        {
                            id: "C1",
                            text: "Ít quan tâm nhau hơn theo thời gian",
                            effect: { bond: -20, empathy: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Dần trở thành người quen cùng nhà",
                                long: "Khoảng cách cảm xúc thường bắt đầu từ những việc tưởng như bình thường và vô hại này.",
                                insight: "Dấu hiệu cảnh báo sớm: Không còn hỏi nhau 'Hôm nay như thế nào?' một cách thật sự muốn biết."
                            }
                        },
                        {
                            id: "C2",
                            text: "Không còn chia sẻ — mỗi người một thế giới",
                            effect: { comm: -25, bond: -25 },
                            scoreBonus: -15,
                            result: {
                                short: "Cô đơn ngay trong mối quan hệ",
                                long: "Đây là dấu hiệu nghiêm trọng — cần hành động sớm trước khi khoảng cách trở nên quá lớn.",
                                insight: "Cô đơn khi đang có đôi — được gọi là 'cô đơn đồng hành' (relational loneliness) — đau hơn cô đơn thông thường."
                            }
                        },
                        {
                            id: "C3",
                            text: "Cảm giác như đang sống cùng người lạ",
                            effect: { bond: -30, comm: -30, empathy: -20 },
                            scoreBonus: -20,
                            result: {
                                short: "Xa cách đã trở thành thói quen",
                                long: "Ở thời điểm này, cần một cuộc trò chuyện thẳng thắn và thành thật về tương lai của cả hai.",
                                insight: "Đây là lúc tư vấn tâm lý cặp đôi có thể giúp ích rất nhiều — không có nghĩa là thất bại, mà là dũng cảm."
                            }
                        }
                    ]
                }
            }
        ]
    },
    {
        id: "s7",
        title: "Không dành thời gian",
        icon: "🕰️",
        module: "family",
        desc: "Người kia lúc nào cũng bận. Bạn cảm thấy mình không còn là ưu tiên trong cuộc sống của họ — và điều đó đau hơn bạn tưởng rất nhiều.",
        choices: [
            {
                id: "A",
                text: "Than phiền và bày tỏ sự không hài lòng",
                effect: { control: -10, comm: -5, empathy: -10 },
                next: {
                    desc: "Họ cảm thấy áp lực và tội lỗi",
                    choices: [
                        {
                            id: "A1",
                            text: "Họ cố thay đổi vì cảm thấy tội lỗi",
                            effect: { reason: 10, comm: 10 },
                            scoreBonus: 5,
                            result: {
                                short: "Thay đổi từ tội lỗi thường không bền vững",
                                long: "Thay đổi vì tình yêu bền hơn thay đổi vì tội lỗi — hãy nói về điều bạn cần, không chỉ điều bạn thiếu.",
                                insight: "Từ 'bạn không dành thời gian' → 'Tôi nhớ khi chúng ta... Tôi muốn lại có những khoảnh khắc đó.' — hiệu quả hơn nhiều."
                            }
                        },
                        {
                            id: "A2",
                            text: "Họ khó chịu, cảm thấy bị phán xét",
                            effect: { control: -15, bond: -15 },
                            scoreBonus: -10,
                            result: {
                                short: "Xa cách thêm thay vì gần nhau hơn",
                                long: "Không ai muốn ở gần người khiến họ cảm thấy tồi tệ — cách nói hoàn toàn quyết định kết quả.",
                                insight: "Câu nói dùng 'tôi' hiệu quả hơn câu nói dùng 'bạn': 'Tôi cảm thấy thiếu bạn' ≠ 'Bạn không bao giờ dành thời gian.'"
                            }
                        },
                        {
                            id: "A3",
                            text: "Họ né tránh nhiều hơn vì áp lực",
                            effect: { comm: -20, bond: -20 },
                            scoreBonus: -15,
                            result: {
                                short: "Vòng lặp tiêu cực hình thành rõ ràng",
                                long: "Than phiền → người kia né → bạn cô đơn hơn → than phiền nhiều hơn. Cần phá vỡ vòng lặp này.",
                                insight: "Để phá vòng lặp: Một người cần thay đổi cách tiếp cận trước — không cần chờ người kia thay đổi."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Chủ động tạo thời gian, rủ làm gì đó cùng",
                effect: { reason: 15, comm: 20, bond: 20, empathy: 15 },
                scoreBonus: 15,
                result: {
                    short: "Tích cực — gần nhau hơn dần từng ngày",
                    long: "Tạo ra thời gian chung là hành động của tình yêu — không phải chờ đợi người kia tự nhận ra.",
                    insight: "Ý tưởng thực tế: 'Hẹn hò' định kỳ mỗi tuần (dù chỉ cà phê 1 tiếng) giữ kết nối hiệu quả hơn những kế hoạch lớn."
                }
            },
            {
                id: "C",
                text: "Mặc kệ, tự lo mọi thứ một mình",
                effect: { comm: -20, bond: -20, empathy: -10 },
                scoreBonus: -10,
                result: {
                    short: "Xa nhau dần, lạnh nhạt theo thời gian",
                    long: "Rút lui hoàn toàn có thể là cơ chế tự bảo vệ — nhưng thường kết thúc mối quan hệ trong im lặng.",
                    insight: "Rút lui là tín hiệu — bạn đang nói 'Tôi đã mệt với việc cố gắng.' Hãy nói điều đó thành lời thay vì hành động."
                }
            }
        ]
    },
    {
        id: "s8",
        title: "Nghiện điện thoại",
        icon: "📱",
        module: "family",
        desc: "Hai người đi ăn cùng nhau nhưng người kia cứ cắm mặt vào điện thoại. Bạn ngồi đó, ăn một mình dù có người bên cạnh — cảm giác vô hình.",
        choices: [
            {
                id: "A",
                text: "Nói thẳng: bỏ điện thoại xuống đi",
                effect: { control: -10, comm: -5, empathy: -5 },
                next: {
                    desc: "Họ hơi khó chịu với yêu cầu",
                    choices: [
                        {
                            id: "A1",
                            text: "Họ cãi lại, tranh luận về chuyện điện thoại",
                            effect: { control: -15, bond: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Tranh cãi về triệu chứng, bỏ qua gốc rễ",
                                long: "Điện thoại là biểu hiện — vấn đề thật có thể là cả hai đã hết chủ đề để nói chuyện với nhau.",
                                insight: "Thay vì 'bỏ điện thoại xuống' → thử 'Mình cùng để điện thoại vào túi trong bữa ăn nhé?' — đề xuất thay vì yêu cầu."
                            }
                        },
                        {
                            id: "A2",
                            text: "Họ làm theo nhưng miễn cưỡng rõ ràng",
                            effect: { reason: 10, bond: -5 },
                            scoreBonus: -5,
                            result: {
                                short: "Buổi ăn trở nên gượng gạo, không thoải mái",
                                long: "Ép buộc sự hiện diện không tạo ra kết nối thật sự — cần cả hai thực sự muốn ở bên nhau.",
                                insight: "Đây là dấu hiệu để hỏi: 'Dạo này mình ít kết nối — em có đang lo lắng gì không?' thay vì chỉ yêu cầu bỏ điện thoại."
                            }
                        },
                        {
                            id: "A3",
                            text: "Họ cất điện thoại và hai người trò chuyện vui",
                            effect: { reason: 15, comm: 20, bond: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Kết nối được khôi phục ngay lập tức",
                                long: "Đôi khi chỉ cần một lần nhắc nhở nhẹ nhàng đúng lúc là đủ để mọi thứ thay đổi tốt lên.",
                                insight: "Kết hợp với việc chuẩn bị chủ đề thú vị để nói chuyện — điện thoại ít hấp dẫn hơn khi có cuộc trò chuyện hay."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Góp ý nhẹ nhàng, chia sẻ cảm xúc thật",
                effect: { reason: 15, comm: 25, empathy: 20, bond: 15 },
                scoreBonus: 15,
                result: {
                    short: "Họ nhận ra và dần thay đổi tích cực",
                    long: "Nói về cảm xúc ('muốn được trò chuyện') hiệu quả hơn nhiều so với phán xét ('cứ cắm điện thoại').",
                    insight: "Cách nói: 'Anh/em thích nhất khi mình nói chuyện với nhau mà không có điện thoại. Tối nay thử không?' — nhẹ nhàng và cụ thể."
                }
            },
            {
                id: "C",
                text: "Không nói gì, tự ngồi buồn một mình",
                effect: { comm: -15, bond: -15, empathy: -10 },
                scoreBonus: -10,
                result: {
                    short: "Cảm thấy bị bỏ rơi, xa nhau dần",
                    long: "Im lặng và chịu đựng là cách yêu bản thân ít nhất — bạn xứng đáng được hiện diện thật sự.",
                    insight: "Im lặng trong trường hợp này thường được đọc là 'ổn' — khi thật ra là 'không ổn nhưng không muốn nói.'"
                }
            }
        ]
    },
    {
        id: "FA03",
        title: "Mâu thuẫn gia đình hai bên",
        icon: "🧧",
        module: "family",
        desc: "Tết đầu sau cưới. Quê vợ xa 300km. Vợ ngỏ ý mùng 2 xin phép mẹ chồng về ngoại. Chồng bảo: 'Mẹ bảo dâu mới mùng 4 họ hàng lên đông, ở nội tiếp khách xong mới được về'.",
        choices: [
            {
                id: "A",
                text: "Gắt lên: 'Em lấy chồng chứ có bán mình đâu? Mùng 2 anh không về thì em tự bắt xe về!'",
                effect: { control: -25, comm: -15, empathy: -10 },
                next: {
                    desc: "Chồng thấy bị xúc phạm gia đình, hai vợ chồng cãi nhau to. Mẹ chồng nghe được, ấn tượng xấu về con dâu. Tết cận kề, bạn làm gì?",
                    choices: [
                        {
                            id: "A1",
                            text: "Làm căng tới cùng, dọn đồ tự bắt xe về ngoại ngay 29 Tết.",
                            effect: { control: -30, bond: -25 },
                            scoreBonus: -20,
                            result: {
                                short: "Mâu thuẫn lên đỉnh điểm",
                                long: "Hành động này có thể làm sụp đổ hoàn toàn hình ảnh của bạn với gia đình chồng, nguy cơ ly hôn rất cao.",
                                insight: "Phản ứng bốc đồng trong lúc nóng giận thường đốt cháy những chiếc cầu nối quan trọng nhất."
                            }
                        },
                        {
                            id: "A2",
                            text: "Bình tĩnh lại, xin lỗi lỡ lời, kiên định bày tỏ mong muốn và rủ chồng tìm cách nói với mẹ.",
                            effect: { reason: 15, comm: 20, empathy: 15 },
                            scoreBonus: 15,
                            result: {
                                short: "Giải quyết được xung đột",
                                long: "Nhận lỗi sai về thái độ nhưng vẫn bảo vệ nhu cầu chính đáng thể hiện sự trưởng thành.",
                                insight: "Cương nhu đúng lúc. Bạn có thể sai cách nói, nhưng không sai về nhu cầu."
                            }
                        }
                    ]
                }
            },
            {
                id: "B",
                text: "Thở dài, ấm ức nuốt nước mắt. Gọi hủy vé xe và báo bố mẹ đẻ năm nay không về sớm.",
                effect: { empathy: -10, comm: -15, bond: -10 },
                next: {
                    desc: "Trong những ngày Tết ở nội, bạn khó chịu, mặt bí xị, làm việc như cái máy, không nói chuyện với chồng. Chồng gặng hỏi, bạn làm gì?",
                    choices: [
                        {
                            id: "B1",
                            text: "Nói dỗi: 'Không có gì, anh cứ lo nhà anh đi, quan tâm tôi làm gì!'",
                            effect: { comm: -20, control: -10 },
                            scoreBonus: -10,
                            result: {
                                short: "Đẩy chồng ra xa",
                                long: "Tâm lý dồn nén có thể dẫn đến trầm cảm, trong khi đối phương không hiểu thực sự bạn muốn gì.",
                                insight: "Đóng vai nạn nhân không giúp bạn giải quyết được vấn đề thực tế."
                            }
                        },
                        {
                            id: "B2",
                            text: "Ôm chồng khóc tâm sự: 'Em nhớ nhà. Năm sau vợ chồng mình thống nhất chia đều thời gian nhé.'",
                            effect: { reason: 15, comm: 25, bond: 20 },
                            scoreBonus: 15,
                            result: {
                                short: "Chồng thấu hiểu, thương vợ hơn",
                                long: "Dù năm nay chịu thiệt, nhưng bạn đã thiết lập được ranh giới rõ ràng cho những năm sau.",
                                insight: "Sự tổn thương được chia sẻ đúng cách sẽ tạo ra sự gắn kết sâu sắc."
                            }
                        }
                    ]
                }
            },
            {
                id: "C",
                text: "Nắm tay chồng: 'Em hiểu mẹ muốn đông đủ. Vợ chồng mình cùng xin phép mẹ mùng 2 về, sáng mùng 4 lại lên tiếp khách nhé.'",
                effect: { reason: 20, comm: 25, empathy: 15, bond: 20 },
                next: {
                    desc: "Xuống xin phép, mẹ chồng không vui: 'Dâu mới mà bỏ đi sớm họ hàng đánh giá. Anh chị cứ quyết thế thì không coi tôi ra gì.' Bạn làm gì?",
                    choices: [
                        {
                            id: "C1",
                            text: "Tức giận, cự cãi trực tiếp với mẹ chồng để bảo vệ quyền lợi.",
                            effect: { control: -20, bond: -15 },
                            scoreBonus: -15,
                            result: {
                                short: "Bùng nổ mâu thuẫn mẹ chồng nàng dâu",
                                long: "Trực diện đối đầu với mẹ chồng thường khiến chồng bị kẹt ở giữa rất khó xử.",
                                insight: "Không nên biến mâu thuẫn thành cuộc chiến thắng - thua với mẹ chồng."
                            }
                        },
                        {
                            id: "C2",
                            text: "Giữ im lặng, bóp nhẹ tay chồng ra hiệu để chồng lên tiếng bênh vực và giải thích thay mình.",
                            effect: { reason: 25, comm: 20, empathy: 20, bond: 25 },
                            scoreBonus: 20,
                            result: {
                                short: "Tạo mặt trận đồng minh với chồng",
                                long: "Để con trai ruột thuyết phục mẹ luôn là bài toán thông minh và ít gây tổn thương nhất.",
                                insight: "Trong mâu thuẫn gia đình lớn, vợ chồng phải luôn là một khối thống nhất."
                            }
                        }
                    ]
                }
            }
        ]
    }
];

// ── LOCAL STORAGE ──
function getDB(){
  try{ return JSON.parse(localStorage.getItem('hthn_db')) || []; }
  catch(e){ return []; }
}
function saveDB(users){
  try{ localStorage.setItem('hthn_db', JSON.stringify(users)); }
  catch(e){ showToast('Lỗi lưu dữ liệu!'); }
}

// ── STATE ──
let state = {
  view: 'dashboard',
  currentUser: null,
  activeScenarios: [],
  si: 0,
  node: null,
  currentScoreObj: { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 },
  tempResult: null,
  tempTimeStart: 0,
};

let radarChartObj = null;
let pieChartObj = null;

const $ = id => document.getElementById(id);

function showToast(msg){
  const t = $('toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}
function clamp(v, mn, mx){ return Math.min(mx, Math.max(mn, v)); }
function formatDate(iso){
  if(!iso) return '—';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

// Register Plugin
if (window.ChartDataLabels) {
    Chart.register(ChartDataLabels);
}

// ── RESTORE SESSION ──
try{
  const s = sessionStorage.getItem('hthn_user');
  if(s) state.currentUser = JSON.parse(s);
}catch(e){}

// ── ROUTER ──
function renderApp(){
  const app = $('app');
  if(state.view === 'login')   { app.innerHTML = renderLogin();    return; }
  if(state.view === 'register'){ app.innerHTML = renderRegister(); return; }

  const authBtn = state.currentUser
    ? `<button class="nav-btn logout" onclick="doLogout()">Đăng Xuất</button>`
    : `<button class="nav-btn" style="color:var(--accent-purple);border:1px solid rgba(168,85,247,.3)" onclick="changeView('login')">Đăng Nhập</button>`;

  app.innerHTML = `
    <div class="app-wrapper">
      <nav class="top-nav fade-in">
        <div class="nav-inner">
          <div class="nav-brand" onclick="changeView('dashboard')">🔥 HT.HON NHAN</div>
          <div class="nav-menu">
            <button class="nav-btn ${state.view==='dashboard'?'active':''}" onclick="changeView('dashboard')">Trang Chủ</button>
            <button class="nav-btn ${state.view==='finance'?'active':''}" onclick="changeView('finance')">Công Cụ Tài Chính</button>
            <button class="nav-btn ${state.view==='profile'?'active':''}" onclick="requireAuth('profile')">Hồ Sơ & Nhật Ký</button>
            ${authBtn}
          </div>
        </div>
      </nav>
      <main class="main-content">${renderMain()}</main>
    </div>`;

  if(state.view==='dashboard') setTimeout(drawDashboardRadar, 100);
  if(state.view==='result')    setTimeout(drawResultRadar, 100);
  if(state.view==='finance')   { calcFinance(); setTimeout(initPieChart, 100); }
}

function renderMain(){
  if(state.view==='dashboard') return renderDashboard();
  if(state.view==='scenario')  return renderScenario();
  if(state.view==='result')    return renderResult();
  if(state.view==='finance')   return renderFinance();
  if(state.view==='profile')   return renderProfile();
  return '';
}

function changeView(v){ state.view = v; renderApp(); }
function requireAuth(v){
  if(!state.currentUser){ showToast('Vui lòng đăng nhập!'); changeView('login'); }
  else changeView(v);
}

// ── 1. AUTH ──
function renderLogin(){
  return `
    <div class="auth-container fade-in">
      <div class="auth-box">
        <h2>Đăng Nhập</h2>
        <div class="form-group"><label>Tài khoản (Email/SĐT)</label><input type="text" id="l_contact" placeholder="email@example.com"></div>
        <div class="form-group"><label>Mật khẩu</label><input type="password" id="l_pass" placeholder="••••••••"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="doLogin()">VÀO HỆ THỐNG</button>
        <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="changeView('dashboard')">🏠 Về Trang Chủ</button>
        <div class="auth-link" style="margin-top:20px">Chưa có tài khoản? <span onclick="changeView('register')">Đăng ký ngay</span></div>
      </div>
    </div>`;
}

function renderRegister(){
  return `
    <div class="auth-container fade-in">
      <div class="auth-box">
        <h2>Tạo Tài Khoản</h2>
        <div class="form-group"><label>Họ và Tên</label><input type="text" id="r_name" placeholder="Nguyễn Văn A"></div>
        <div class="form-group"><label>Email / SĐT</label><input type="text" id="r_contact" placeholder="email@example.com"></div>
        <div class="form-group"><label>Mật khẩu</label><input type="password" id="r_pass" placeholder="••••••••"></div>
        <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="doRegister()">HOÀN TẤT</button>
        <button class="btn btn-outline" style="width:100%;margin-top:10px" onclick="changeView('dashboard')">🏠 Về Trang Chủ</button>
        <div class="auth-link" style="margin-top:20px">Đã có tài khoản? <span onclick="changeView('login')">Đăng nhập</span></div>
      </div>
    </div>`;
}

// ── 2. DASHBOARD ──
function renderDashboard(){
  const isGuest = !state.currentUser;
  const name      = isGuest ? 'Khách' : state.currentUser.name;
  const score     = isGuest ? 0       : state.currentUser.score;
  const joinDate  = isGuest ? formatDate(new Date().toISOString()) : formatDate(state.currentUser.createdAt);

  return `
    <div class="fade-in">
      <div class="card dash-welcome">
        <div class="welcome-left">
          <div style="font-size:2.5rem;margin-bottom:.5rem">👋</div>
          <h1 style="font-size:1.5rem;margin-bottom:.5rem;color:var(--text-title)">Xin chào, ${name}!</h1>
          <p style="color:var(--text-muted);margin-bottom:1.2rem;font-weight:600">Bạn đã sẵn sàng cho bài tập hôm nay chưa?</p>
          <button class="btn btn-primary" onclick="startModule('emotion')">BẮT ĐẦU BÀI TẬP ➔</button>
        </div>
        <div class="radar-container"><canvas id="dashRadar"></canvas></div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-purple)">${score}</div>
          <div class="stat-label">Tổng Điểm</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-green)">${SCENARIOS.length}</div>
          <div class="stat-label">Tình Huống</div>
        </div>
        <div class="stat-box">
          <div class="stat-val" style="color:var(--accent-orange);font-size:1.2rem;line-height:2.6rem">${joinDate}</div>
          <div class="stat-label">Ngày Tham Gia</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">⚙️ CHỌN CHỦ ĐỀ MÔ PHỎNG</div>
        <div class="modules-grid">
          ${MODULES.map(m=>{
            const cnt = SCENARIOS.filter(s=>s.module===m.id).length;
            return `
              <div class="module-card" onclick="startModule('${m.id}')">
                <div class="mc-icon" style="color:${m.color}">${m.icon}</div>
                <div class="mc-title" style="color:var(--text-title)">${m.name}</div>
                <div class="mc-count">${cnt} Tình huống</div>
                <button class="btn btn-outline" style="width:100%">⊙ Bắt Đầu</button>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function drawDashboardRadar(){
  const ctx = $('dashRadar'); if(!ctx) return;
  if(radarChartObj){ radarChartObj.destroy(); radarChartObj=null; }
  const st = (state.currentUser && state.currentUser.stats)
    ? state.currentUser.stats
    : { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  const hasPlayed = state.currentUser && state.currentUser.history && state.currentUser.history.length > 0;
  const vals = hasPlayed
    ? [st.reason,st.empathy,st.control,st.comm,st.finance,st.bond]
    : [0,0,0,0,0,0];
  _drawRadar(ctx, vals);
}

function drawResultRadar(){
  const ctx = $('resRadar'); if(!ctx) return;
  if(radarChartObj){ radarChartObj.destroy(); radarChartObj=null; }
  const sc = state.currentScoreObj;
  const vals = [
    clamp(50+sc.reason,0,100), clamp(50+sc.empathy,0,100),
    clamp(50+sc.control,0,100), clamp(50+sc.comm,0,100),
    clamp(50+sc.finance,0,100), clamp(50+sc.bond,0,100),
  ];
  _drawRadar(ctx, vals);
}

function _drawRadar(ctx, dataVals){
  const labels = ['Lý trí','Thấu cảm','Kiềm chế','Giao tiếp','Tài chính','Gắn kết'];
  radarChartObj = new Chart(ctx, {
    type:'radar',
    data:{
      labels,
      datasets:[{
        data: dataVals,
        backgroundColor:'rgba(225,29,72,0.15)',
        borderColor:'rgba(225,29,72,0.8)',
        borderWidth:2,
        pointBackgroundColor:'rgba(245,158,11,1)',
        pointBorderColor:'#fff',
        pointBorderWidth:2,
        pointRadius:5,
      }]
    },
    options:{
      layout:{ padding:35 },
      scales:{
        r:{
          angleLines:{ color:'rgba(225,29,72,0.15)' },
          grid:{ color:'rgba(225,29,72,0.15)' },
          ticks:{ display:false, max:100, min:0 },
          pointLabels:{
            color:'#fda4af',
            font:{ size:12, family:'Nunito', weight:'900' },
            padding:12,
            callback:(label,i)=>[label, dataVals[i]>0?`${dataVals[i]}%`:''],
          }
        }
      },
      plugins:{
        legend:{ display:false },
        datalabels:{ display:false },
      },
      maintainAspectRatio:false,
    }
  });
}

// ── 3. SCENARIO ──
function startModule(moduleId){
  if(!state.currentUser){ showToast('Vui lòng đăng nhập để bắt đầu!'); changeView('login'); return; }
  state.activeScenarios = SCENARIOS.filter(s=>s.module===moduleId);
  if(!state.activeScenarios.length){ showToast('Chủ đề đang cập nhật!'); return; }
  state.si = 0; state.node = null;
  state.currentScoreObj = { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  state.tempTimeStart = Date.now();
  changeView('scenario');
}

function nextScenarioInModule(){
  state.si++;
  state.node = null;
  state.currentScoreObj = { reason:0, empathy:0, control:0, comm:0, finance:0, bond:0 };
  state.tempTimeStart = Date.now();
  changeView('scenario');
}

function renderScenario(){
  const s    = state.activeScenarios[state.si];
  const node = state.node || s;

  // Reached a result leaf
  if(node.result){
    state.tempResult = {
      ...node.result,
      bonus:     node.result.scoreBonus !== undefined ? node.result.scoreBonus : 10,
      timeTaken: Math.round((Date.now() - state.tempTimeStart) / 1000),
    };
    // Use setTimeout so DOM doesn't flicker
    setTimeout(()=>changeView('result'), 50);
    return `<div style="text-align:center;padding:50px;font-size:1.2rem;font-weight:700;color:var(--accent-purple)">⏳ Đang phân tích kết quả...</div>`;
  }

  const total = state.activeScenarios.length;
  return `
    <div class="fade-in scenario-box">
      <div class="card" style="padding:0;overflow:hidden">
        <div class="scenario-header">
          <button class="btn btn-outline" onclick="changeView('dashboard')">❮ Về Trang Chủ</button>
          <div class="sh-title">TÌNH HUỐNG ${state.si+1}/${total}: ${s.title}</div>
          <div style="width:110px"></div>
        </div>
        <div style="padding:1.5rem">
          <div class="context-box">
            <div class="c-label" style="color:var(--accent-purple)">▶ BỐI CẢNH:</div>
            <div class="c-text">${s.context || s.desc || ''}</div>
            <div class="c-question">💬 ${node.question || node.desc || s.question || 'Bạn sẽ làm gì?'}</div>
          </div>
          <div class="c-label" style="color:var(--accent-green);margin-bottom:.75rem">▶ LỰA CHỌN:</div>
          <div class="choices-container">
            ${(node.choices||[]).map(c=>`
              <div class="choice-item" onclick='pickChoice(${JSON.stringify(c).replace(/'/g,"&#39;")})'>
                <div class="choice-letter">${c.id}</div>
                <div class="choice-text">${c.text}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function pickChoice(c){
  // Accumulate score effects
  const sc = state.currentScoreObj;
  const e  = c.effect || {};
  sc.reason  += e.reason  || 0;
  sc.empathy += e.empathy || 0;
  sc.control += e.control || 0;
  sc.comm    += e.comm    || 0;
  sc.finance += e.finance || 0;
  sc.bond    += e.bond    || 0;

  // Navigate tree: result leaf or next branch
  if(c.result){
    state.node = { result: c.result };
  } else if(c.next){
    state.node = c.next;
  } else {
    // No next defined — treat as result with default
    state.node = { result:{ short:'Lựa chọn đã ghi nhận.', insight:'', long:'', advice:'', scoreBonus: e.reason+e.empathy+e.control+e.comm+e.finance+e.bond } };
  }
  renderApp();
}

// ── 4. RESULT ──
function renderResult(){
  const res   = state.tempResult || {};
  const bonus = res.bonus || 0;

  // Save to user — guard against double-save
  if(!res._saved && state.currentUser){
    res._saved = true;
    const u = state.currentUser;
    u.score = (u.score||0) + Math.max(0, bonus);
    u.stats.reason  = clamp((u.stats.reason  || 50) + state.currentScoreObj.reason,  0, 100);
    u.stats.empathy = clamp((u.stats.empathy || 50) + state.currentScoreObj.empathy, 0, 100);
    u.stats.control = clamp((u.stats.control || 50) + state.currentScoreObj.control, 0, 100);
    u.stats.comm    = clamp((u.stats.comm    || 50) + state.currentScoreObj.comm,    0, 100);
    u.stats.finance = clamp((u.stats.finance || 50) + state.currentScoreObj.finance, 0, 100);
    u.stats.bond    = clamp((u.stats.bond    || 50) + state.currentScoreObj.bond,    0, 100);
    if(!u.history) u.history = [];
    u.history.unshift({
      scene:   state.activeScenarios[state.si]?.title || '',
      outcome: res.short || '',
      bonus,
      time:    (res.timeTaken||0) + 's',
      date:    new Date().toISOString(),
    });
    updateUser(u);
  }

  const isLast = state.si >= state.activeScenarios.length - 1;
  const actionBtns = isLast
    ? `<button class="btn btn-outline" style="flex:1" onclick="state.node=null;changeView('scenario')">↻ CHƠI LẠI</button>
       <button class="btn btn-primary" style="flex:2" onclick="changeView('dashboard')">HOÀN THÀNH ➔</button>`
    : `<button class="btn btn-outline" style="flex:1" onclick="state.node=null;changeView('scenario')">↻ CHƠI LẠI</button>
       <button class="btn btn-primary" style="flex:2" onclick="nextScenarioInModule()">TIẾP THEO ➔</button>`;

  const bonusPositive = bonus >= 0;
  return `
    <div class="fade-in scenario-box">
      <div class="card" style="padding:2rem">
        <div class="res-top">
          <div class="res-trophy">🏆</div>
          <div class="res-title">Báo Cáo Kết Quả</div>
        </div>
        <div class="res-row">
          <div class="r-sym" style="color:var(--accent-green);border-color:var(--accent-green)">⭐</div>
          <div class="r-content">
            <h3 style="color:var(--accent-green)">ĐIỂM VẬN DỤNG:</h3>
            <span class="score-badge ${bonusPositive?'':'negative'}">${bonusPositive?'+':''}${bonus} ĐIỂM</span>
            <span style="color:var(--text-muted);font-size:.85rem;margin-left:12px;font-weight:700">⏱ ${res.timeTaken||0}s</span>
          </div>
        </div>
        <div class="res-row">
          <div class="r-sym" style="color:var(--accent-purple);border-color:var(--accent-purple)">👁️</div>
          <div class="r-content">
            <h3 style="color:var(--accent-purple)">GÓC NHÌN TÂM LÝ:</h3>
            <p style="font-weight:700;color:var(--text-title);margin-bottom:6px">${res.insight||''}</p>
            <p>${res.long||''}</p>
          </div>
        </div>
        <div class="res-row" style="border:none">
          <div class="r-sym" style="color:var(--accent-orange);border-color:var(--accent-orange)">💡</div>
          <div class="r-content">
            <h3 style="color:var(--accent-orange)">LỜI KHUYÊN:</h3>
            <p>${res.advice||'Giao tiếp bình tĩnh là chìa khóa hạnh phúc.'}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title" style="justify-content:center">📊 TÁC ĐỘNG TÂM LÝ TÌNH HUỐNG NÀY</div>
        <div class="radar-container" style="width:100%;height:280px"><canvas id="resRadar"></canvas></div>
      </div>
      <div style="display:flex;gap:1rem">${actionBtns}</div>
    </div>`;
}

// ── 5. FINANCE ──
function renderFinance(){
  return `
    <div class="fade-in">
      <div class="fin-header">
        <div class="fin-title">💳 Kế Hoạch Tài Chính Gia Đình</div>
        <button class="btn btn-primary" onclick="showToast('Đã lưu kế hoạch!')">💾 Lưu</button>
      </div>
      <div class="fin-grid">
        <div class="fin-col">
          <div class="fin-card">
            <div class="fin-step-title"><div class="fin-step-icon">📥</div>THU NHẬP HÀNG THÁNG</div>
            <div class="fin-row"><div class="fin-label">👤 Chồng:</div><input type="number" id="fIncH" value="15000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">👤 Vợ:</div><input type="number" id="fIncW" value="12000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-total">TỔNG THU NHẬP: <span id="fTotalInc" style="color:var(--accent-purple)">27.000.000 VND</span></div>
          </div>
          <div class="fin-card">
            <div class="fin-step-title"><div class="fin-step-icon">👛</div>PHÂN BỔ CHI TIÊU</div>
            <div class="fin-row"><div class="fin-label">🏠 Thuê nhà / Trả góp:</div><input type="number" id="fExpR" value="6000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">🍽️ Sinh hoạt (Ăn, điện...):</div><input type="number" id="fExpL" value="9000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">👥 Biếu nội/ngoại & Đám tiệc:</div><input type="number" id="fExpF" value="4000000" class="fin-input" oninput="calcFinance()"></div>
            <div class="fin-row"><div class="fin-label">💰 Tiết kiệm / Đầu tư:</div><input type="number" id="fExpS" value="8000000" class="fin-input" oninput="calcFinance()"></div>
          </div>
        </div>
        <div class="fin-col">
          <div class="fin-card" style="height:100%">
            <div class="fin-step-title"><div class="fin-step-icon">🥧</div>PHÂN TÍCH & ĐÁNH GIÁ</div>
            <div style="font-size:.78rem;color:var(--text-muted);font-weight:800;margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.5px">Biểu đồ phân bổ</div>
            <div style="height:220px;position:relative;margin-bottom:1.2rem"><canvas id="pieChart"></canvas></div>
            <div class="fin-alert" id="fAlertBox"><span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange);font-weight:700">Đang tính toán...</p></div>
            <div style="font-size:.78rem;font-weight:800;color:var(--accent-purple);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.5px">Nhận xét:</div>
            <div style="font-size:.9rem;color:var(--text-main);line-height:1.6;font-weight:600" id="fComment">Nhập số liệu để xem phân tích.</div>
          </div>
        </div>
      </div>
    </div>`;
}

function calcFinance(){
  const incH = Number($('fIncH')?.value)||0;
  const incW = Number($('fIncW')?.value)||0;
  const total = incH + incW;
  if($('fTotalInc')) $('fTotalInc').textContent = new Intl.NumberFormat('vi-VN').format(total) + ' VND';

  const essentials = (Number($('fExpR')?.value)||0) + (Number($('fExpL')?.value)||0);
  const wants      = Number($('fExpF')?.value)||0;
  const savings    = Number($('fExpS')?.value)||0;
  const totalExp   = essentials + wants + savings;

  if(pieChartObj){ pieChartObj.data.datasets[0].data=[essentials,wants,savings]; pieChartObj.update(); }

  const alertBox = $('fAlertBox');
  const comment  = $('fComment');
  if(!alertBox||!comment) return;

  const pctSave = total>0?Math.round(savings/total*100):0;
  const pctEss  = total>0?Math.round(essentials/total*100):0;

  if(totalExp > total){
    alertBox.style.borderColor='var(--accent-red)'; alertBox.style.background='rgba(225,29,72,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">🛑</span><p style="color:var(--accent-red);font-weight:800">Nguy cơ RẤT CAO!</p>`;
    comment.innerHTML=`Thâm hụt <b>${new Intl.NumberFormat('vi-VN').format(totalExp-total)} VND</b>. Áp lực tài chính là nguyên nhân hàng đầu của mâu thuẫn hôn nhân.`;
  } else if(pctSave>=20){
    alertBox.style.borderColor='var(--accent-green)'; alertBox.style.background='rgba(16,185,129,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">✅</span><p style="color:var(--accent-green);font-weight:800">An toàn tài chính!</p>`;
    comment.innerHTML=`Chi sinh hoạt: <b>${pctEss}%</b> · Tiết kiệm: <b>${pctSave}%</b>. Quản lý rất tốt — nền tảng ổn định cho hôn nhân!`;
  } else {
    alertBox.style.borderColor='var(--accent-orange)'; alertBox.style.background='rgba(245,158,11,.06)';
    alertBox.innerHTML=`<span style="font-size:1.5rem">⚠️</span><p style="color:var(--accent-orange);font-weight:800">Nguy cơ trung bình.</p>`;
    comment.innerHTML=`Chi sinh hoạt: <b>${pctEss}%</b> · Tiết kiệm chỉ <b>${pctSave}%</b>. Khuyến nghị tăng quỹ dự phòng lên tối thiểu 20%.`;
  }
}

function initPieChart(){
  const ctx = $('pieChart'); if(!ctx) return;
  if(pieChartObj){ pieChartObj.destroy(); pieChartObj=null; }
  const essentials = (Number($('fExpR')?.value)||0)+(Number($('fExpL')?.value)||0);
  const wants      = Number($('fExpF')?.value)||0;
  const savings    = Number($('fExpS')?.value)||0;
  pieChartObj = new Chart(ctx, {
    type:'doughnut',
    data:{
      labels:['Sinh hoạt','Ngoại giao / Dự phòng','Tiết kiệm'],
      datasets:[{ data:[essentials,wants,savings], backgroundColor:['#0284c7','#e11d48','#059669'], borderWidth:0 }]
    },
    options:{
      plugins:{
        legend:{ position:'bottom', labels:{ color:'#94a3b8', font:{ family:'Nunito',size:12,weight:'bold' } } },
        datalabels:{
          color:'#fff', font:{ weight:'bold',size:13,family:'Nunito' },
          formatter:(value,ctx)=>{
            const sum = ctx.chart.data.datasets[0].data.reduce((a,b)=>a+b,0);
            return (sum===0||value===0)?'':Math.round(value*100/sum)+'%';
          }
        }
      },
      maintainAspectRatio:false, cutout:'55%', layout:{ padding:10 }
    }
  });
  calcFinance();
}

// ── 6. PROFILE ──
function renderProfile(){
  const u = state.currentUser;
  const history = u.history||[];
  let pos=0,neg=0;
  history.forEach(h=>{ if(h.bonus>=0) pos++; else neg++; });
  const total = history.length||1;
  const posPct = Math.round(pos/total*100);
  const negPct = 100-posPct;

  const rows = history.length===0
    ? `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:1.5rem">Chưa có dữ liệu. Hãy thử một tình huống!</td></tr>`
    : history.map(h=>`
      <tr>
        <td style="color:var(--text-title);font-weight:800">${h.scene}</td>
        <td>${h.outcome}</td>
        <td style="color:${h.bonus>=0?'var(--accent-green)':'var(--accent-red)'};font-weight:900">${h.bonus>=0?'+'+h.bonus:h.bonus}</td>
        <td style="color:var(--text-muted)">${h.time}</td>
      </tr>`).join('');

  return `
    <div class="fade-in">
      <div class="card">
        <div class="card-title">👤 HỒ SƠ & THIẾT LẬP</div>
        <div class="profile-grid">
          <div class="form-group"><label>Mã định danh</label><input type="text" value="${u.id}" readonly style="opacity:.6"></div>
          <div class="form-group"><label>Ngày Tạo</label><input type="text" value="${formatDate(u.createdAt)}" readonly style="opacity:.6"></div>
          <div class="form-group"><label>Họ Tên</label><input type="text" id="p_name" value="${u.name}"></div>
          <div class="form-group"><label>Liên hệ</label><input type="text" id="p_contact" value="${u.contact}"></div>
          <div class="form-group"><label>Mật khẩu mới</label><input type="password" id="p_pass" value="${u.password}"></div>
        </div>
        <div style="text-align:right"><button class="btn btn-primary" onclick="saveProfile()">LƯU THAY ĐỔI</button></div>
      </div>
      <div class="card">
        <div class="card-title" style="justify-content:space-between;flex-wrap:wrap;gap:.5rem">
          <span>📒 NHẬT KÝ RA QUYẾT ĐỊNH</span>
          <span style="font-size:.82rem;color:var(--text-main);font-weight:800">
            Tích cực: <span style="color:var(--accent-green)">${history.length===0?0:posPct}%</span> &nbsp;|&nbsp;
            Tiêu cực: <span style="color:var(--accent-red)">${history.length===0?0:negPct}%</span>
          </span>
        </div>
        <table class="diary-table">
          <thead><tr><th>Tình huống</th><th>Hệ quả</th><th>Điểm</th><th>Tốc độ</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ── AUTH LOGIC ──
function doRegister(){
  const name    = $('r_name')?.value.trim();
  const contact = $('r_contact')?.value.trim();
  const pass    = $('r_pass')?.value.trim();
  if(!name||!contact||!pass){ showToast('Vui lòng điền đủ thông tin!'); return; }
  const db = getDB();
  if(db.find(u=>u.contact===contact)){ showToast('Tài khoản đã tồn tại!'); return; }
  const user = {
    id: 'UID'+Math.floor(Math.random()*1e6), name, contact, password:pass,
    score:0,
    stats:{ reason:50, empathy:50, control:50, comm:50, finance:50, bond:50 },
    history:[],
    createdAt: new Date().toISOString(),
  };
  db.push(user); saveDB(db);
  state.currentUser = user;
  sessionStorage.setItem('hthn_user', JSON.stringify(user));
  changeView('dashboard'); showToast('Đăng ký thành công! 🎉');
}

function doLogin(){
  const contact = $('l_contact')?.value.trim();
  const pass    = $('l_pass')?.value.trim();
  if(!contact||!pass){ showToast('Vui lòng nhập đủ thông tin!'); return; }
  const db   = getDB();
  const user = db.find(u=>u.contact===contact && u.password===pass);
  if(!user){ showToast('Sai thông tin đăng nhập!'); return; }
  // Migration guard
  if(!user.stats||user.stats.reason===undefined)
    user.stats = { reason:50, empathy:50, control:50, comm:50, finance:50, bond:50 };
  if(!user.history) user.history = [];
  state.currentUser = user;
  sessionStorage.setItem('hthn_user', JSON.stringify(user));
  changeView('dashboard'); showToast('Đăng nhập thành công! 👋');
}

function doLogout(){
  state.currentUser = null;
  sessionStorage.removeItem('hthn_user');
  changeView('dashboard');
  showToast('Đã đăng xuất.');
}

function saveProfile(){
  const name    = $('p_name')?.value.trim();
  const contact = $('p_contact')?.value.trim();
  const pass    = $('p_pass')?.value.trim();
  if(!name||!contact||!pass){ showToast('Không được để trống!'); return; }
  state.currentUser.name = name;
  state.currentUser.contact = contact;
  state.currentUser.password = pass;
  updateUser(state.currentUser);
  showToast('Đã lưu hồ sơ!');
}

function updateUser(u){
  const db  = getDB();
  const idx = db.findIndex(x=>x.id===u.id);
  if(idx!==-1){ db[idx]=u; saveDB(db); }
  sessionStorage.setItem('hthn_user', JSON.stringify(u));
  state.currentUser = u;
}

// ── INIT ──
renderApp();