import { useState, useMemo, useCallback } from "react";
const TODAY="2026-02-24";
const n2=v=>v?.toFixed(2)??"—";
const fD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("es-PE",{day:"2-digit",month:"short",year:"numeric"}):"—";
const fN=v=>v!=null?v.toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2}):"—";
const fS=v=>"S/ "+fN(v);
const LOGO="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAxCAIAAADSlzWcAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAHdElNRQfqAwIPCQfSWEnIAAAoeUlEQVR4nO18eZhdVZXvb619zp2rKjUnqQxVmRMyEcjI0IBAq4BRaGh40LbdAraKjXbj1PJJ63N4StvSfiAiLUoLIiBK2woiPpkJISQkIVNlrMqcSio13aq695y913p/nHNvbgZiAN/UX++vkq/q3n32tObfWvuQquKdtfLzdPLPjn9QFQARqaqqElHl52+vlQc5ZqLy5yfscEzPkyzgba/thPNGc1X+X7nUP8q83ql0OsXRj+pEBNXyZ292rOXTrOxwchqcYqukUzTgySl3iqO9k7WdygJOclBvc9J3IC4aj1AhpwqlI9/g5BL8f7i9cwr9/9j+gASXVIcAOIZaJcYQAQTKIEMASBUgBTkoASbqVNZCbzZLZbeTrKdyhFPpWdnn1El7wqfebLrjhz15z5Ms6ZgHj+9/kknfrP2BA40JLAIlJZCqCgQAhMgZY5QMlEBKColYQQMRAhkiZiJACFwiMN6JTJ9w//9326lT/f/ApCdeyZv1PvI5ESSyplbEEvvMPhSOtG+4eLhvqGBDca6YHxpZXzO6OctQIEsElaLCEXzQm+qJ/xeI9J+7nezoVZViVSyqATEZL90X6roNO19ase7V17dt6zi0vyc4cLA7y4WLz5n2pU9ePXZk4/qOrqefe+n02ZMWzhmfUKgQWAEQU4UcIzLeCqX/l+z0f5oWHaxC/7AEiygQGpPoHZRHf7vygX9/cdXqXfnew/AUzsLaRQtnfO5jly+9YHZn18Cd9z336K+X5cbWd+zsPmtq411f/ou2liypDxDUEhmAK2eJF/FfcvzHbmUCHyvBZc9YARBcaA2zsv/I0yu+ee/Tq17frS6gVDJVXVvIHx41tu6zNyy9/uo/SZvEnQ8vu/37T+3cvveKay5NJ+F681cvPWdsUzXDX79998iGuoYaz0lIYEABJhhHYIBjRvsvSf7f0o6S4KO9Weus83x/d+/wbd/61QOPPBNgyKQyvnouKIbDg5dcPP+bt147Y3zTS1t2feHLP37uxf2mrhZpSQX+eXMavv3FP5s8tml/z+Ad9//2nvufvGDx9Pv+5eYaH6qkCnWOyFijBmQQe2n/ReA/YjuxBFdCKtZa30+t2bH/hi98b8WKTkpXGVKDVGGomMoMf/6Wqz/3ocsSFH7zx09/+VtP1VXp9+7+6+/e++za13d95G/mffnmD2STmSeXb/zc7Y+uXXMgmU2fe+GSrD9c7N2oYWBqxhq/WSwZtUyeKgMA4SRx1NvZ4Ju2dzTFKXqwpxIvnLoz/E6O5QiBVWPEQqHOie+nXlq3+7q/u6uj87CXzTgJgXTQf6C1te6ur37mvUtm7z48+MmvPfrYz1eOm9D47a9d/bPHXtq0fsvtX778luveFTj39fue+Nqdz+QDL5GhO/7xmr95/+z8hv8edvzcoFezszNz/kFqzjVCcdj8tpd/XDsGvXpLj5TbScDCWM+cwtjHr+TthXknwS9PpZGqQhUxwiAqkFC8lP/qtr1X3vjdnXt6vARgAyRStnvgnLPHfPfrH5vZOnrNtn1/88WHXlm216+pGtFgM15yV/u2e27/8PVXnN0/GPzd7Y/84Ke/M5k2Vzz8tU+d9/nrP5Df9UD42t9Wmx7rM4bENr7fO/v7JA0+iTLTH0JC3krTkt15M/lgqgDfKvHwSkqcAFGJo30XndvJlQQRVaLaJxw/OvBT2BG/DaD0KBVdsV2GhiZldnUPfuzT9+7ce9hPqwudMdVh7/4r3jf3zq99bGRN9tnVHdd/9sFt7QdOmz1hT2/xYFdfwnZ9/9s3fnjp4v29xY/eev/jT69K1LUGh3s+eu3Cz17/Aacqh9tz0iuJLBeN8YaDwfU6uN9UNcJFINgpLvukW4pPLdpQzLHlAyn9XgGq4iiIvzTGkdFwFAQNjRzPk9H1yFoAxKBexSBHuTtvbWvxOG/lobgdFbSoqkKGQLd845GVa7r9TNLZYWNM2N/950sX3nf7TSNrsk+v2HTdzT/ctq1v8Z9O++wtf+r7AcLiP/3jX3x46eL9/X0fvvXex5/amqofG/T3veucid+85Sp2IUgT6VzReMLWUycaunQyYXIRmhkv+x0ntcqDqKqqRONF6kkj06Mo0ZKi3wlHjj76JvrBsTAhlUaL2efkP+Xxy1wT06b8uFb8/od/tJI/3mru4CgnSyT0/NRDP3/5kSdWmZoqW9zjU3XQ23flFbPv+cqN1ZnU71Z2XPe5H3YdQvPommsuP+eue39zcPuOr3326k9cOb8/H97whUefeHp9oqGpMNDbNjrz7S9ek8uYILAesTdm6eCBZd6BXw/5RYsmr+1TA2ZkyoW+xyjz+DuT43JI7URU5BiUF4AxpkJZxZM6JxUqTCKdSWSYGXG6hJxzImUFK/qHHCgqaRGAADaGo7+JSFRVJB4HwCkIJSkRCEzEfJRSOrVGIhJtVUSNsbsOFd/119/asiPvUV7Zub7iJRfO+fEdH6/NplZs2H3VJ77T0c3kpbImqM/Vde7o/Ku/PPfe264Qketve+jfHnnNH1GtRTHa9+M7brzy/NnFsGA8TwQw7A2vC/Y9V7R9yRELU00X/r79gPj2wgmji458cgQG0duzxNEjogIFlIiPsnnlfIlKqGwYpqwzRZQYTHxcZxVVqDCzExhCdLhvd2GKGBMUYhB5b2mocjpA4Yg9wikd0QnCJBFnTOKhx5/bsuWgl0pSaOxwYe7Mpru+ckNtNrltf+/1n/9xx95EKp3wvaFB8fI7D55zTtv/+NQlBvz1e576t0ee96qbnLIMD37qIxddef5sGxY840FBIHKK1KzEhFkpLRaRANTz+cHnt13Q1mIgFCFq78zDUiiJg5d4fuWW19t3+cl0OQkmhWD6hMZ3LZ4O50r5LYiIMfy71zau23ggmUqEJkyGRkmLGjZnk5deuCCTNCqOjVn2xvZVa3eblAdxJJ7SEWPMSnxMGKAQgoI8QdFoEm7pBXOaGmqcc8Z4b2zd/9wrG5FIEWBU+Ti9FUs3xYk5gqqhYjB84RmTZ04d50QMG7yV5iG2QPB971C+8PATq2Gqof2hDRtr+O6vfnR8c9VwwX76Kw+v3dYHF1z5num5+rq7732qcVT6m39/ZVN15mfPrPvKPb/2U83kYAv9CxeM+9xH3gNXBIyEAoAAYpLY+HkMgS9NjVWv7Bhe0dG1sK3OOmViLtlhhULfsk9BQkQ6DP3yPb/6/RPruSojIlAl42lBWyckfvvTWyc3jog0FgAiBI6+euevn31mB2eTIgFE2XgyOPCnF026/L1LRIQUBP7GfU/98uHVXDNCkIcYKJc08EnMihKMhnbM6OSl588B1DlnjLnn4RfvuvMXXNckTqCKIz75sY9XfJ4gOfzED2+ZOZVUjvGa/nDzKtxIfnnVltXbDpikRwEhyN/293+5aPZEgX7j/qd/8fsNSFTPmz3i8g+ccctt/46i/eh1Zy+aPbbjQN+tt/+i6DJ+MhW6oaq0fOVvL6vLJgqFoucZP8mxcVUiEqdOleHEWowwfh8nfrV+z8K2ZkGgIFYBUeT/xgH5KZtlBQAhk9i7r2/LjkNoHE2GOIpDiPyqdMee7kd/9eo//NXF0VZVwWy27epq39FP9fXGB2yaaYg4LUicd+78BHOxECRTqZ2HBte196N+jEkTa04lElEABHJKxy5So1iZQmLP9RXOXjRtVGON2MDzuK8Qvr5xBxqaTSbLTiNrfwxJoxbJLpSJ2QZucmv97FmTAMts3qIDDo6dR3UAfv/yRgmcYRf297zvPWd++Kp3AeEzK3d+674nOVuHkHLpprvvfnrbui2LF035xDUXAPjS3U+0bz5sMp5woIXg2kvOunD+pOFi3k94Ree+/a+Pf/XOR3/22xUrNmzb090fiPGIjed5np9Le9W+/vaN7YMuhDjVKCWpgCicqkJjRPxUaawAaM26Xfv2D5IhcaoCVVZRq3kkUg/+YsX+3iFjWEScOACvb9i3/0A/IxA3rBKoBDYMUkmdP3scAFYDYN3WXXv2dnt+wUmvuoJKoBKqhCJWnKpVtVArYkUdqWU4FQexBLWwwfw5rQCsE2Zvx86uTdu7wElrnYioU7GsliVktYA4iIMTdQIRlYgywHD/wikNo2tS1snb8EO9qB7DN8gHsnLDXnheUAwbmr0vfeqqlDF9Q8GX7vh5vj/pZ0h9fn7lJi+QRF32lhvPb6hK/+KFdQ/+8mVTXa86JFZqGryP/uU5QJhKZLoGijd96e6fPfoyTAKezeZMY21tQ331uxdNH9syMpnyR09svXrh+Hx/1oWSTaUL1ikio0kgEDRyinGciLwpgUEAlq3eagtsUiqRYwOQeuoCTmDD5kOPPb3y41eeoy6MjMGyldvVEkzKyTAgCqPFcEJb3WkTRwOOjAX85Ws7i0XycikVXylaUahwCj/KyUQYK0M8QOJUigMHTiiTTSw8fQoQi/yKDbsO9xQ5k464GeQ8LSiRY1I1vkuUwEQFOQAgZhiwv2jONABQU0LR3gLfexS59ewd6O7dsbcPCR/dnZ+4YencSWMEuPcXL7zw6lauGuvxQH1GugM/tOEV58++/LxZQ0PhHff+LhwmkwVpGoMHr126ZPbEesBt3TVww+f/5blXt3pNo1UtyA072tnR37G546o/O9fLZT70kf9hEqna5nTL6FFrf/3MWUtmfepD72UmsaoqYKaSQY5iv/Ke3qQ+hlTFGAwG8uraHfANVErxBAGOVI16wsn7H3v52ksWjEipOK+v6Fas2QbjKyQKspg9sf1nzp42srraFa3xMQxZ9tpuqIgGqgIonK+UABPUghwiVoQK2wAh4AEMCMHTAZ44acS0tgbV0DABeGXlVogQIfL3CaQwAkA8kIYcxowKADair0VIaTtt+pgT7v3UCBwH53Sgq6+vfxjFYPLUMdf/t0sBu33/4F0/fpYyDdK3768/euFwge+7//eZOtx07fkA/uOl9hde7TSZjFCBw2Q261+z9Cwg8eyqrR/+9He2dx5IVte4cJBJVRmDPX9z3UXTZk+tNvaDl5wz7Tfj27fsfX3j1tWbd7+wYcvGLZ3zZ7RNntDQVFeX9n0RK+KIfObIHJNS7LeeEEQkgnPOM7xjZ/eG7YeQNHCI5V6hJADEgXLeijV7fvn79R+8dB4z2rfs27xjP1JZVUtxaVECcIvPHA/AqRhOH9hzcP+u7VVVXsKHCAjENDgs/mCQrPQSlMSon0n6xErwoepB86b37AWj6rPpMAx93+/LF1av2wM/pyqgCB72HIxBmPIDUutgUMJYiHwAzFwoBlPH56a3Nb19AitphNN0DwzbIiEMPnzd+0bX1wB670+f7ejMI5mbNav5nPmT/u4rD8LS+86Zed4ZE/JhcPfPnlNNgJlM6PoGzz1/8llz2/7t58/8wz89NMRpk8sGIgRDBFco3nL90ts/98FXVq17Y9OOIrBoxqjFp4360PsXCaS7f2h3Z/eWzs4Nmzd5oOaG+kVnnNbS3OCcQ4wpK2t8lnqipFMJVzCvrdvV3VOkbFJspR4jJRYWYqtI/OCxl9534awRKX/Fmm09/QXOVqtaBRGRtVJblzlj1kTAkm9V/cbazEN33wQYE5kKlQJ5n/jHn7z4agdlchGYzIbcUHju/HF3felaJ5ZjaB2hC5pGpESihfO67fu27OqBn1INY1ybnBYOfuamy/784gXF/CAZjnwQIiJE5pacaq462VSdEueI36IDHREYcJGxGhwqFoYKp5/Wct3SxQA27Tr0wL+/iFQVnLNUdcf3ntq7O0jW6g3vXwDgVy+sf/6ldqqqgwRqPfjh1Vecf9t3/+1HDz595z9/7oXlW//5Oz/hmloW2KH8/Fktt918NQCP/CLprj37JoxqAFjUMpmmmlzjrOzps8YRUV8Ybty868c/+/UVl7xrcusYG4RiIFBfiJmFiHAiMESVwACeXdUOAZEKOVKOUT0FRVwcMmXTLyzvePLZN65597xnX1kPMJETBZSZyAXhlJlNU1ubVdXjJIBMOntaayYSUxFlps4DvZ07D8FLQS2UQAImSHDBkqnTW+udEz5SmVQOTxxgXljdMTA4ZHJJsQApgSXkUbXZv7pk3uRxDSJ1fBz9tDJfcRQw/hZE2Sv3ZSKEQ5ddfGZLdQbAw0+8snffkF9VazXY2L7fkAcyC2Y3LFrY5iA/++UqDVJe2pJYJ35tXfWPHnistto+/dNvTx3b8NwLawCflEEC0erqNPsAAONBNMW8v6+4cs3mceOaH3ty+Z4D/Z5JhRpaChWoSWfGNzS9vHzN5NYxMJxgowAZdbYINWBTgq6PAu6NZw7lh1e9sQWer6JxtFiRvgEIykQkzj34i+fOXTRtzYZO+GlVF4k6g5wdXDR3QXXCD631jCFCBPBFz4sTZm/52m27D/RwqkYji6vsnHopXTB3EgAnEh0kgDLMwswOtGzV9ijpHdXLMEFdOKJ+5Pauga6eHghFeAEowp9ZAZZgRltLXU2ViwZ9W2j9ESQrlUjWNaTfe/4MwO0bGH7sibXwR0CK1X5gE1LkBPoLl593Rsakl2/a9/tl25BNQYogAwVJ13vOe/dNH7o0ISFgTSmBEJXBOyuRejGGqqurXtmw7wvf+VnnrgO3feq6ex54sWvHIUomNWVMwquqSkmx+3Mfv7JveOi7P3i4urYx7bHRYvPY0WfOOY0hqiqxlSrlCQAVgTGbtnft2NkPP6MaRJ4OQDAMVXWRmybqiLLZF9bu+eZ9zxzoFRhPNVK+5NQhgSXzWiOfLnKOI7EBlMBgArDs9e0asJ8l6yKuYS2GbeOqZ00aDcAwV0gwRwJsjL/zYP/aTXvhp0UtwLFVTJr2PT1Lb/geiaiyIkCpNBnGC62MrZHf3H9rXW2NWqvMxHS8F3IqBI57p1Jm4ZyWmW3NgPfCis3r23s5N8IF+z75yT9/6n++9srKA42NuYsWTwHwuxfW9fTmuTanIalv0Nv7sY9d/Om/vjQI8lY946Uit1eplIUpzcGsiZS35+Dg5vZD8BJMNH928+h3z1kwb2rb2IZRtdlstsrzTW3S85P+S2s3rN+yd8gxk1m3atOmHTs/eMUlsFbL6dUY86KIwMtf35YftJwzolRKE0BdSELERjVS8Krk5Yv0/QeeCzlBsbsNJoh1o5uqT582FgiIPJSQ03IeiRn5wC5fuwOJFNRFWyNmDQdPnzZ9VH3aWVtpJmMgWgSgde07d+7rIz+nWkTJrQUgqkWTISOqBMmU7oKox0aLhYnTxrW2NolYIsZxGvtUCaxAtKrmmsRF50zOpjxAnnpmvSgQFmZNap7S1nRXRxdUZ01pmTxhlFN5eVU7jIH1HEISUNJfPHMyoMSGI5VA8RGDBKTxYQO+x0Y1l+PTZ46cf/rU9507+eY/W5BKpeL4jxTqVJmZX9vU+Zlv/CQ/lEl7VBB3xrxphMLylauWnDHPuYJG+h9OSVU9Jufgv7h2C+BIHcQjBXtww+HcOY3GpVau3WVyEOsrExAIvCIS5Vw7KRETQjdzcsv4UfUijhgEUXDJtVNVMPOWzn3tO7rhsxMVJABDDGh41hnTIlbgo29YqaqIM4aXvbFdhtSrURuzjI2lSxkQhRI0sioKEMQoWR1eMHdk2rCzUrJLb6d55aLV8aMbLzlvPoD9hweff20DkgmIra4d99Rzmw71OZCbP3tswng79+c3bjkAP62iUWle44hsa0sTQESeSsUOSzXPZZZLpZLk5OzTxl/xky9UJXwjVmDC0BFFIKUy1DnlBK9v7xgsphpbxtvBnkwquWZt+8wxi7q6+gDY0Pm+h9gkEVTZ83d2D6zesAuJlMYRiBITht0H/uS0KRNGXXPTfYpsKaopO9jl5JsCBBssmjshQSg6+B7hiJihlGozq9Z1HO7Jc26EWoUSWJ1FVVUiMsDEcWFAWcgUMMyB6PI1WxEl+xQAgTyoR0wUY9ElAJLABJAnNmmS5pzTp6CUZ4wQ31hvaRkYKJnC8pFDSzBqicCR+ItqVVWmKpsAsHrj3o69vZxsAgqvvb5l+WtbTCrnCj3zZo8DsH3v4QOHApiUh0DIOBc21FU11OcAISqBi5VJfK2AXggikvRMVUJtMKhIgRQQIsMGIqEICSkAwz6DXVgQCX2TNswN1dVbtm5o79g9tXWMilON9CGLioFZu3l3594B+DlRCzaqEBUkaN7UcRf+yfRZM5rf2NrPKVZHpJ6SRflmnBIITjSRoUVzJkZrJ5XIt9CYYQ1DALzy+raIIlHmnQlSsK1TaydNaIxyi/Euj5RwiDFm++7Db2zsRtJXhFACGCyA1aFQRY4GphQMgnHB4Oix2RlTxgNRdFRKX1HJZER4F0qkplKwWM50lbIVHko+JmDFiTFY+UaHHaakx9aF1jkvWV3UoLE2N7W1AcC2zr1DhQJX+3COKAFXbKjPVmU8FXcEUzzOTMRpET+RSaWsC0k54aciziXyVUVFmBIwROIASJSFizV9olC041tz7z7vfQ88/JuRI5sWnT5tSmuLiC0riGWvb9Nh4mpPNADA7InLj2pJTpsyKkV84xVnf+KrjwNcKg8iRNAJAVAm0sCOHVM/a/JowBrl2Dk8shUyBvlisGbzQZh0XBRCICZYd9qUlvp0woWWPS9KqpS9v+jh1zfu2H8woHRaUSAkQU7VpiWcPWtsLpdyIkRHckcsREaKw/klp08aW5+xokwcC0npH2KYnjUmpJaQoBizIhwB8r2YZ4lEmFkFWN3eCeMV7fD01txZC2f96OFlQGJ0c3VLQxWAPV09ECFICGIIHOqqMkk26qyyQVl0RcsTMijibeN7mWzOZ2by1u85tH37zpps7rW1W887Z868iS0H+vLf+tcndnYFMyZWV1ePMGxU1YFEHft+Z1d+YGi3y457devuQrh2UmuLgEjVYyqoe2XVJnCCQKQR0yiG3bxpY8aNrlN1l19y5t2PPL9hx5Dvw6orqcRICiyxgQ3nnTZmZGN1UYo+g5TjUyJSQJxj32vftWvTri74GYijIw5k8azTpxEgAB91DUdVohS7Wfb6Ztgic8Y5AxIyIYr+6JHZn373xnH1uVCEuEIwSteqPYBVhFghTllgTcSSwjCs5MjlVTPKrGQFYOeABBmFCMNTilOZHuFI0sYY6h0MdnT0IpFGse/M2XMmttbbQhG+P7KhdkQ2DWBfV19sydSDAqp+wmNAYE6Agh9hzWgyylWll2/c++k7fv3SqrXXLF3yyorNL7248YILpj1y52cGQ/zkP17Ys2Noxqyma6662Esoe2Is+aSZdNXabQM/+N6/5PvM1DnjFnzkMgFCBL4weckdu7s2bNmDZCZyWeMTsuHZp09KAIXAjq7N/reli279xpOS9CExmx9RLgogWDR3ogdYjZwdKn0XZTsA4LU3OgZ68pxuELUEAoxYW1PtLZrZCqAS30DJOBlj+gO7Yk0njFF1MUfB08DOmdHWWp9zNkwYc1Q9WilGExIXu789xWAPcSN7DZaCBFI2v51MYBKt0EEKDjk44azHzSEG2eaJqwAul/Z4sZDH5p+Gi+FAvgg2UG1qaFmxZhfYB4abm0Z4bBQ41DcYuRIEpvg0ReOVSYQoRVldQCPR1ZJxMISqmuyv73/60buenn7RguZRI19a+R/JUaMPD+nzr77+/gsWP3HvPwwEaGnKPvXc6kP7D0uYKg4HYbanr3fvrPHz77n95kO9Q401uV0dG/ftaxs7qiG0AYBVb+zaf7BI2ZxGGX4mp0hUeWfOawNgmAG56tKFP3z4uW0HAvaSWkrFKilgnGhVtX/mzFYAHgxRFG6W3i0hiFTospU74DywwBEAYmghmDi9btKEZkCIjsahSFXEGH/rzr3t2w8iWaUaAhaUJE1BDiw5ow2AEwUrH/2sxj8MKDTfv/k+t/dZS5yZ/vfZxum97V8c6Fqu8NJjr6se0Zpf90+kWXIFnXyt1ozqbn+kee6t8HKE2GJ6MaMqiBBYN6oue+mFM/753udSI+oeeOz5vAVX5aT/YG1NCoAFAheiZBUAgEikVDdcEtmKvwHAQa2K59T3qDaTuPjcecNslp53xjPL1sFaw33Dxez+A3kCz5zYDBAzLZo36eYbLvKTKRHHBLiZ75rf1trcKCLM/Fp7zY8f+eVHPnhVXXUKwCsrO2AThmElYirSgmubWDdj0ig4VUZow8nN1VdftvCrdz1NfioWpEheiLQYtLXVzJjYCFiOguWK4xZVzzNdA8OvvrEPfgqQWMgMoUjz504ekfactWxMiTxRjjPWi6+t3dLTW/Qy9VYtiIic2lSqKrVwbuTQMcUhewUMGZdIgMi44f1DOx6vHT+7WDfXr20a2v5YYc+Lo067NaBe5+W42AvZWXvGV4f3/3Zox/erpnwkO/AShYNqouAPqqWKjgj9BhugcPONFz/54rqNW4bC0Kgx8AHWbNYAUIvikAWpgkTVg8JQftAGKkYtxDiGB/jGgEiJiCzI+T5l2VPSnFeVzuauem/D5Zcu7ust/PPdjyWrqpYsWtyxoUMk8f3HX77vp0+lctXWSTqRSiUSjpSVhJTgHv/tG2Eohv3C4PA5C2aOGzNx28699XOmdg8PrVjXDi8JIdaosNIgHJ4zY9qo6qyzAbNRIsBd+74lP/j5K/sPF4znxykAOMNJa4vzTpvRUJUWFxKbitiDAEAcjL9u+57te/YikVMNiYmU1Fkk3JJ5k8oMXQpcKIJfIjZZtqoD4ispqa9i2FNn8xMm1Eyf2AwJ2XgnfXmJ85K5mraLe3e/5PXa7IyJgwPLsqNP81oug4jPHO77jV/kgd0vmP6tfvU0eClP6kIvzR6MkAiIpQxVKgAmso7G1VZ9/dNXfPKL91uqOdA7pLBCJp1JAAAJ1ECZIiyQCNDuw/3OIeUnguEgYB0q2K6+ASQ8H0mIg8/bdxduuv3BfG9+sD8YyA/05HuHBgt9w+ZgbwAyLz6/rK1pZGiLO3f2LV/ezrVNIg5OECbjtBoLyEVKhsjXwYFEwk6acAGzAtjQ2b2hsxt+xsbFAiTKoODseW0Uy4gqwYYyfXz9B94z5+77XtBkrdoQqoDnXAKEs+dOBiAgE0fvlbUkCuDVlXuKA45ynooHIhA0lLo6b+70FsDFTmSlD6Jq2Ds0VFixdg/8hGAors7WBIqD86dPrc9knC2w55chs6MASAIEJCwKbZhW3zi+8PodQ5u9RG3rwL7/me1/VSwGMZSQvBG1g53Frg11S/626FGRevzCRuuGyDRyosZVVFXGOIMiYa1975IpU3702Zu/8tDuZT2pTJ2VfGRnPcOZlFfehijg+7t65Iu/2JRIZ9vq+h+8+4ft6w535QGRQnAQqoDZvuHwXatWgz0wQw3YRwQ1pTN+yk8mM16udt32vddcfsHIphEm6bNqBCQpwJEfZziVyxFgyHQPDTXXJHfs2BbSCAAb17QX+/KZrJAUCB6IrHVVdVg4qxWAKjPi10sA8heXn/3vv1zV3d/rmSQgRIF1/fV1dMaMNgAlW1hBJQWzWpXVq95gskmvW0OQeMZQPijOmzqpbUyTiGUyKAuyKogUDuxtau88sGtb1q+BBFAQK5Af9PNnnzEVgBIf45TGj4KgLlq7KwZD618bktXMuVzzuxINC8KuzsOvftKKS4+6Sptm9FWf1jLnv3cn7urd9Upu1MUIR/Sv+soQMrnJHxwx9nJI8si7mVRV1akaYqvOGi/9nYd+f8vXH3aJUTIUfv7ji7/28UsVuPYz9z/0+GpTnXNOiA3EmVTWnHFxMT1icRsWZfcP7e1Mp1lJQvJJlYh98YzxBhkcDuVYPOerhImEv3rj1seffClZ1RCG9szpzR+99mJfnTIRE4Q0Sv4ojO9t2LHr4SdfHHa+CYO5k0YtvXCRn/Auu+isEVX+7j1dew4WyfcAGzm9our5/vS25pSnKgkmF0WYKkGg/pbOfcPDw8awKjkYEc0mecr4kUk/KsbQ2HUun4k4K7Z956G+gjUMVo2TE87V1+Ymj2pWWDBDwVxKUBJBLDHt68l37O7yTJJVBSSkIBcqTR/bVF/Fqh7BVxx5dUlUOqxKgANUHYOHXNilfZ2SruHcJGja2H6bXy9efyq9pECWhjo5czp0X7G4P+WNQWEHCVQdMq2UajF67NszmChKrqaCYuFvr7mgNp37zDcf3b+/UAjiVdTVVUWaLwoEPRIaHvLEedWZV3YXi6NHtYxrC8QwQhLx2ToZCML+4mBvbZj/1HsXnzutTUSjyHtgOHj4ggU79x7IZNKXXbjotNaRUWq6fDusXD/bP1QcN7p5865D2YR595/MWzxrUnT0YtEyunlMS8QNJeAYIJBICCgRNEoDgQAvwTRr4phKdyZylkUiYY38m2OsInvGnzWxReOouEwJUnXiHDNF9VwllIEi6FpFm0dUj6qt1iMlwKoqREbEiVMQEx8Ts5V/ZyCqiEzBG+c3ThAI1IpAvaxfey4IasVnULZBVNVrSXujIcLJkQAcEakwnJJ6Ze1PhCjDReqRIY89Z4f/4v0LJk5t+fitP9q3e4+DGtDYphy0QBG0q0VHzELUs882j0aCVu3Bqo4CGCCBLSLsQXE3hrpGN2Ruu3zJvAljw7BIZKIwIpM01//ZBeWbByKOSseHCIuBAiSCqrR/45UXHZEqJwKh+MIBRDS6FFJhNonIA6F0HQ0AiD0goqWCCCql9CxVXmuIO5d/YQI4KrGWoxS4EIG9UkBBqCBklNBkVZGIZ0vF8hHrETO4hDpW0rbEBxUhtfEg0JCJQR6biPaOFGrIRAAXQVUYFL3ISiFGQYioedTdpJKnHh+uYSPWDiyZPupXP/y79k3bbaFgUumxLfWcSBEbA6uSYPXUG7Y9Oz03OzDGJDiVgrrBoNhjgx4tHGrKyNXnnX7Te06fPKJKw1DZlDxVBmCdi9BGYiI+xiZVnrVGFTxxKpiJlKNom6OKrciFONLKiOyRgr0yjhcjR5GyOHrKN0nGaVxLUkbZ475Uhtsrr6TSkZQDRVIah5ARAMoKRZzvPMa3qiBErLdJgajUvhRJEcfLPPJ+k5KXFkPTzLEnDxxz+SzKFpTDMBXPMFtrR+b8lgUzbCgAJreOSho7fLAbySyQUKgmVLp6/a7dXF9lC/n8UDeKh5mD1qb0e84ef91ZMxeMaWZRG7rolo+J14Lokle8thKgWsrCliAhxPf9OL6yofFG4n6lfWiJDCgfZWxNj3DKscdY4oM3+f4YGpepetyHpUizDDhW9jnqjY561H964plL11bKj0UqoGTfS1JY9vRLlI+1UcV9ytJzRxcJxH+JSsn8q4iICpNHpAWrv3xm9TOvrtvW2X24e6hnYLivaHkQQWudP6ah2k+Ma0rPHFe9eMr4s6eMG1+VgWooApCBRG4jwxwTiPyhRkdflKYjEUlMwpL1PXKycZ+3kSF/K41KuFOk5PXI+R+pacFJeOwUW7m2pAwgRQ4KxSkFrTyTYwDjE76EJdIxUbVwPFQFEyoRRYFHfjgYLBQGi7Yw7AquqEmvvqaqIZep4vj6iYhCARMpj1INRgQHVjDw0SVqZYeg8uV4UiFDx994j/RdOS0TPcKVwx5VnvUOjrpcLXT0wlj1mIMtneMfqR3DphS/X1JKU3CJxXHsSUp8XfX41cQ1nJVDx1UKTlCG1ymmZZxCU6ei0WVaYqaSKqETuBQn3kiF2nwzjKcEhVZonQpOreTouHM5/KjggLfR9KQ3v2IzXOa8t1o89RZXUtZYJWN17M7ik4wJfLRAnPI8kcVWIYhEniIBZCiW0cqeZbJVTnUsV57okaO6HC8l5WcrpojXVlaNJZ74I5z4cRbt2DVUfvVHJPMxp1HJRsd8gqNP8n8BpPW5l8u/5WsAAAAIdEVYdGNvbW1lbnQAD7r06QAAAABJRU5ErkJggg==";
const UNI=[{id:1,pl:"ARR-903",mk:"INTL"},{id:4,pl:"ATW-887",mk:"INTL"},{id:6,pl:"X2C-881",mk:"VOLVO"},{id:8,pl:"V8J-827",mk:"INTL"},{id:9,pl:"ARF-761",mk:"VOLVO"},{id:17,pl:"ATS-900",mk:"VOLVO"},{id:27,pl:"AEV-885",mk:"KENW"},{id:28,pl:"ARX-819",mk:"FREIGHT"},{id:29,pl:"AUU-877",mk:"KENW"},{id:31,pl:"T9H-800",mk:"FREIGHT"}];
const COND=[{id:1,nm:"HIDALGO V."},{id:2,nm:"FLORES V."},{id:3,nm:"GAMBOA B."},{id:4,nm:"MACHA E."},{id:5,nm:"ZAPATA G."},{id:6,nm:"VALDIVIEZO Y."},{id:7,nm:"VILLANUEVA T."},{id:8,nm:"SANCHEZ C."}];
const RUTAS=[{id:1,c:"CHI-GYQ",o:"Chiclayo",d:"Guayaquil",tp:"INTL",km:980},{id:2,c:"CHI-BOG",o:"Chiclayo",d:"Bogotá",tp:"INTL",km:2850},{id:3,c:"LIM-CHI",o:"Lima",d:"Chiclayo",tp:"LOCAL",km:770},{id:5,c:"LIM-TRU",o:"Lima",d:"Trujillo",tp:"LOCAL",km:560},{id:8,c:"CHI-LIM",o:"Chiclayo",d:"Lima",tp:"LOCAL",km:770}];
const CLI=[{id:1,rs:"Agroindustrias AIB",ruc:"20100055237",pa:"PE"},{id:2,rs:"Cementos Pacasmayo",ruc:"20419387658",pa:"PE"},{id:4,rs:"TransAndina Ecuador",ruc:"0992847561001",pa:"EC"},{id:5,rs:"Distrib. Nal. Colombia",ruc:"900456789-1",pa:"CO"},{id:6,rs:"Minera Yanacocha",ruc:"20137291313",pa:"PE"}];
const gU=id=>UNI.find(u=>u.id===id),gC=id=>COND.find(c=>c.id===id),gR=id=>RUTAS.find(r=>r.id===id),gCl=id=>CLI.find(c=>c.id===id);
const COMPRAS_I=[
  {id:1,fecha:"2026-02-10",prov:"PetroEcuador S.A.",tdoc:"FACT_EXT",ndoc:"001-0045892",gal:800,puUsd:2.35,totUsd:1880,tc:3.785,base:7115.80,igv:0,tot:7115.80,cu:8.89,lote:"LOT-001",vjId:1},
  {id:2,fecha:"2026-02-14",prov:"PetroEcuador S.A.",tdoc:"FACT_EXT",ndoc:"001-0045978",gal:900,puUsd:2.38,totUsd:2142,tc:3.792,base:8122.46,igv:0,tot:8122.46,cu:9.03,lote:"LOT-002",vjId:2},
  {id:3,fecha:"2026-02-20",prov:"GasolinExpress GYQ",tdoc:"FACT_EXT",ndoc:"002-0012456",gal:750,puUsd:2.32,totUsd:1740,tc:3.798,base:6608.52,igv:0,tot:6608.52,cu:8.81,lote:"LOT-003",vjId:4},
];
const VJS_I=[
  {id:1,cod:"VJ-2026-0001",fP:"2026-02-10",fS:"2026-02-10",fL:"2026-02-12",tr:4,con:1,ruta:1,cli:4,serv:"INTL",peso:28.5,carga:"Frutas",est:"FINALIZADO",bolsa:{pen:1500,usd:500,tcUsd:3.785,totalPen:3392.50},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"001-0045892",prov:"PetroEcuador",mon:"USD",monto:1880,tc:3.785,base:7115.80,igv:0,tot:7115.80},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-001",prov:"Rutas Lima",mon:"PEN",monto:280,tc:1,base:237.29,igv:42.71,tot:280},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B001-456",prov:"Varios",mon:"PEN",monto:180,tc:1,base:152.54,igv:27.46,tot:180},{cat:"Aduana",tdoc:"RECIBO",ndoc:"ADU-018",prov:"SUNAT",mon:"PEN",monto:350,tc:1,base:350,igv:0,tot:350},{cat:"Hospedaje",tdoc:"FACT_EXT",ndoc:"HGQ-892",prov:"Hotel GYQ",mon:"USD",monto:45,tc:3.785,base:170.33,igv:0,tot:170.33}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00234",fecha:"2026-02-13",cli:4,mon:"USD",monto:2500,tc:3.792,base:8033.90,igv:1446.10,tot:9480,estado:"COBRADO",fCobro:"2026-02-20"}]},
  {id:2,cod:"VJ-2026-0002",fP:"2026-02-14",fS:"2026-02-14",fL:"2026-02-17",tr:9,con:3,ruta:1,cli:4,serv:"INTL",peso:24,carga:"Insumos",est:"FINALIZADO",bolsa:{pen:1200,usd:600,tcUsd:3.792,totalPen:3475.20},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"001-0045978",prov:"PetroEcuador",mon:"USD",monto:2142,tc:3.792,base:8122.46,igv:0,tot:8122.46},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-002",prov:"Rutas Lima",mon:"PEN",monto:320,tc:1,base:271.19,igv:48.81,tot:320},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B001-489",prov:"Varios",mon:"PEN",monto:240,tc:1,base:203.39,igv:36.61,tot:240},{cat:"Hospedaje",tdoc:"FACT_EXT",ndoc:"HGQ-910",prov:"Hotel GYQ",mon:"USD",monto:90,tc:3.792,base:341.28,igv:0,tot:341.28}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00235",fecha:"2026-02-18",cli:4,mon:"USD",monto:2200,tc:3.798,base:7081.36,igv:1274.64,tot:8355.60,estado:"PENDIENTE",fCobro:null}]},
  {id:3,cod:"VJ-2026-0003",fP:"2026-02-18",fS:"2026-02-18",fL:"2026-02-20",tr:6,con:5,ruta:3,cli:2,serv:"LOCAL",peso:30,carga:"Cemento",est:"FINALIZADO",bolsa:{pen:800,usd:0,tcUsd:0,totalPen:800},
    gastos:[{cat:"Comb.Local",tdoc:"FACTURA",ndoc:"F040-5672",prov:"Grifo Repsol",mon:"PEN",monto:720,tc:1,base:610.17,igv:109.83,tot:720},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-003",prov:"IIRSA",mon:"PEN",monto:180,tc:1,base:152.54,igv:27.46,tot:180},{cat:"Alimentación",tdoc:"BOLETA",ndoc:"B002-1234",prov:"Varios",mon:"PEN",monto:150,tc:1,base:127.12,igv:22.88,tot:150}],
    ingresos:[{tdoc:"FACTURA",serie:"F001",nro:"00236",fecha:"2026-02-21",cli:2,mon:"PEN",monto:3800,tc:1,base:3220.34,igv:579.66,tot:3800,estado:"COBRADO",fCobro:"2026-02-24"}]},
  {id:4,cod:"VJ-2026-0004",fP:"2026-02-20",fS:"2026-02-20",fL:null,tr:28,con:6,ruta:1,cli:4,serv:"INTL",peso:22,carga:"Mat.Constr.",est:"EN_RUTA",bolsa:{pen:1000,usd:450,tcUsd:3.798,totalPen:2709.10},
    gastos:[{cat:"Comb.Ecuador",tdoc:"FACT_EXT",ndoc:"002-0012456",prov:"GasolinExpress",mon:"USD",monto:1740,tc:3.798,base:6608.52,igv:0,tot:6608.52},{cat:"Peaje",tdoc:"RECIBO",ndoc:"VAR-004",prov:"IIRSA",mon:"PEN",monto:280,tc:1,base:237.29,igv:42.71,tot:280}],
    ingresos:[{tdoc:"DOC_INTERNO",serie:"DI",nro:"00015",fecha:"2026-02-20",cli:4,mon:"USD",monto:1800,tc:3.798,base:5793.56,igv:0,tot:6836.40,estado:"PEND_FACTURAR",fCobro:null}]},
  {id:5,cod:"VJ-2026-0005",fP:"2026-02-26",fS:null,fL:null,tr:17,con:7,ruta:2,cli:5,serv:"INTL",peso:25,carga:"Equipos",est:"PROGRAMADO",bolsa:{pen:0,usd:0,tcUsd:0,totalPen:0},gastos:[],
    ingresos:[{tdoc:"DOC_INTERNO",serie:"DI",nro:"00016",fecha:null,cli:5,mon:"USD",monto:3200,tc:3.798,base:10316.95,igv:0,tot:12153.60,estado:"PEND_FACTURAR",fCobro:null}]},
  {id:6,cod:"VJ-2026-0006",fP:"2026-02-28",fS:null,fL:null,tr:8,con:4,ruta:8,cli:6,serv:"LOCAL",peso:32,carga:"Eq.Mineros",est:"PROGRAMADO",bolsa:{pen:0,usd:0,tcUsd:0,totalPen:0},gastos:[],ingresos:[]},
];
const DOCS_I=[{id:1,tipo:"GUIA_REM",nro:"T001-125",fecha:"2026-02-10",ent:"NTF",ref:"VJ-0001",desc:"Guía CHI-GYQ",arch:"GR_125.pdf"},{id:2,tipo:"FACT_EXT",nro:"001-045892",fecha:"2026-02-10",ent:"PetroEcuador",ref:"LOT-001",desc:"Fact.comb.Ecuador",arch:"FACT_892.pdf"},{id:3,tipo:"FACTURA",nro:"F001-00234",fecha:"2026-02-13",ent:"NTF→TransAndina",ref:"VJ-0001",desc:"Fact.transporte",arch:"F001-234.pdf"},{id:4,tipo:"FACTURA",nro:"F001-00235",fecha:"2026-02-18",ent:"NTF→TransAndina",ref:"VJ-0002",desc:"Fact.transporte",arch:"F001-235.pdf"},{id:5,tipo:"FACTURA",nro:"F001-00236",fecha:"2026-02-21",ent:"NTF→Cementos",ref:"VJ-0003",desc:"Fact.local",arch:"F001-236.pdf"},{id:6,tipo:"DOC_INT",nro:"DI-00015",fecha:"2026-02-20",ent:"NTF int.",ref:"VJ-0004",desc:"Pend.facturar",arch:null},{id:7,tipo:"BOLETA",nro:"B001-456",fecha:"2026-02-11",ent:"Varios",ref:"VJ-0001",desc:"Alimentación",arch:"BOL_456.jpg"}];
const KCOLS=[{k:"PROGRAMADO",l:"Programado",i:"📋",c:"#818CF8"},{k:"EN_RUTA",l:"En Ruta",i:"🚛",c:"#F59E0B"},{k:"FINALIZADO",l:"Finalizado",i:"✅",c:"#34D399"},{k:"CANCELADO",l:"Cancelado",i:"❌",c:"#6B7280"}];
function calcL(v){const tG=v.gastos.reduce((s,g)=>s+g.base,0),tGI=v.gastos.reduce((s,g)=>s+g.tot,0),cP=v.gastos.filter(g=>g.cat.includes("Comb")).reduce((s,g)=>s+g.tot,0),tI=v.ingresos.reduce((s,i)=>s+i.base,0),tIB=v.ingresos.reduce((s,i)=>s+i.tot,0),rt=gR(v.ruta),m=tI-tG,p=tI>0?(m/tI*100):0;return{tG,tGI,tI,tIB,cP,m,p,ck:rt?.km>0?tG/rt.km:0,ct:v.peso>0?tG/v.peso:0,pF:v.ingresos.filter(i=>i.estado==="PEND_FACTURAR"),pC:v.ingresos.filter(i=>i.estado==="PENDIENTE"),km:rt?.km||0}}
export default function App(){
  const [view,setView]=useState("dashboard");
  const [viajes,setViajes]=useState(VJS_I);
  const [compras,setCompras]=useState(COMPRAS_I);
  const [docs,setDocs]=useState(DOCS_I);
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("resumen");
  const [cfm,setCfm]=useState(null);
  const liq=useMemo(()=>{const m={};viajes.forEach(v=>{m[v.id]=calcL(v)});return m},[viajes]);
  const regC=useMemo(()=>{const r=[];viajes.forEach(v=>v.gastos.forEach(g=>{r.push({f:v.fS||v.fP||"",vj:v.cod,tdoc:g.tdoc,ndoc:g.ndoc,prov:g.prov,base:g.base,igv:g.igv,tot:g.tot,cat:g.cat})}));return r.sort((a,b)=>a.f.localeCompare(b.f))},[viajes]);
  const regV=useMemo(()=>{const r=[];viajes.forEach(v=>v.ingresos.forEach(i=>{const c=gCl(i.cli);r.push({f:i.fecha||"",vj:v.cod,tdoc:i.tdoc,sn:`${i.serie}-${i.nro}`,cli:c?.rs,ruc:c?.ruc,base:i.base,igv:i.igv,tot:i.tot,est:i.estado})}));return r.sort((a,b)=>(a.f||"z").localeCompare(b.f||"z"))},[viajes]);
  const pnd=useMemo(()=>{const pF=[],pC=[];viajes.forEach(v=>v.ingresos.forEach(i=>{if(i.estado==="PEND_FACTURAR")pF.push({vj:v.cod,cli:gCl(i.cli)?.rs,tot:i.tot});if(i.estado==="PENDIENTE")pC.push({vj:v.cod,cli:gCl(i.cli)?.rs,tot:i.tot,sn:`${i.serie}-${i.nro}`,f:i.fecha})}));return{pF,pC}},[viajes]);
  const st=useMemo(()=>{const f=viajes.filter(v=>v.est==="FINALIZADO"),tI=f.reduce((s,v)=>s+liq[v.id].tI,0),tC=f.reduce((s,v)=>s+liq[v.id].tG,0);return{tI,tC,mg:tI>0?((tI-tC)/tI*100):0,eR:viajes.filter(v=>v.est==="EN_RUTA").length,pr:viajes.filter(v=>v.est==="PROGRAMADO").length,fn:f.length,nPF:pnd.pF.length,tPC:pnd.pC.reduce((s,p)=>s+p.tot,0),tPF:pnd.pF.reduce((s,p)=>s+p.tot,0)}},[viajes,liq,pnd]);
  const delV=useCallback(id=>{setViajes(p=>p.filter(v=>v.id!==id));setCfm(null);setSel(null)},[]);
  const delCo=useCallback(id=>{setCompras(p=>p.filter(c=>c.id!==id));setCfm(null)},[]);
  const delDo=useCallback(id=>{setDocs(p=>p.filter(d=>d.id!==id));setCfm(null)},[]);
  const mvV=useCallback((id,ns)=>setViajes(p=>p.map(v=>v.id===id?{...v,est:ns,fS:ns==="EN_RUTA"&&!v.fS?TODAY:v.fS,fL:ns==="FINALIZADO"?TODAY:v.fL}:v)),[]);
  const B=({t,bg,c:cl})=><span style={{display:"inline-flex",padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:600,background:bg,color:cl,whiteSpace:"nowrap"}}>{t}</span>;
  const dC=t=>t==="FACTURA"?["#064E3B","#6EE7B7"]:t==="FACT_EXT"?["#1E3A5F","#93C5FD"]:t==="DOC_INT"||t==="DOC_INTERNO"?["#3B0764","#C4B5FD"]:t==="BOLETA"?["#78350F","#FDE68A"]:["#1F2937","#9CA3AF"];
  const IB=({i,onClick,c,t})=><button title={t} onClick={onClick} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,padding:"1px 3px",opacity:.5,color:c||"inherit"}} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=.5}>{i}</button>;
  const NAV=[{k:"dashboard",l:"Dashboard",i:"📊"},{k:"viajes",l:"Viajes",i:"🚛"},{k:"combustible",l:"Combustible",i:"⛽"},{k:"liquidacion",l:"Liquidación",i:"💰"},{k:"documentos",l:"Documentos",i:"📎"},{k:"regcompras",l:"Reg.Compras",i:"📕"},{k:"regventas",l:"Reg.Ventas",i:"📗"},{k:"cuentas",l:"Ctas x Cobrar",i:"💳"}];
  return(<div style={{fontFamily:"'IBM Plex Sans',sans-serif",background:"#07080C",color:"#B8C4D4",minHeight:"100vh"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      @keyframes su{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      *{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#252D3A;border-radius:2px}
      .cd{background:#0E1219;border:1px solid #181E2A;border-radius:8px}
      .bt{padding:5px 10px;border-radius:5px;border:1px solid #181E2A;background:#0E1219;color:#6B7A8D;cursor:pointer;font-family:inherit;font-size:10px;font-weight:500;transition:all .1s}.bt:hover{background:#181E2A;color:#E0E7F0}
      .ba{background:#1E3A5F;border-color:#1E3A5F;color:#93C5FD}.ba:hover{background:#1E3050}
      .mn{font-family:'JetBrains Mono',monospace}
      .ni{padding:6px 12px;cursor:pointer;font-size:10px;font-weight:500;color:#3E4A5A;border-left:2px solid transparent;display:flex;align-items:center;gap:6px;transition:all .08s}.ni:hover{color:#B8C4D4;background:#0E1219}.ni.ac{color:#F59E0B;border-left-color:#F59E0B;background:#0E121966}
      .tbl{width:100%;border-collapse:collapse}.tbl th{padding:6px 7px;text-align:left;font-size:8px;font-weight:600;color:#3E4A5A;text-transform:uppercase;background:#07080C;border-bottom:1px solid #181E2A}.tbl td{padding:5px 7px;font-size:10px;border-bottom:1px solid #181E2A15}.tbl tr:hover td{background:#181E2A22}
      .ov{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:50;display:flex;align-items:center;justify-content:center}.mo{background:#0E1219;border:1px solid #181E2A;border-radius:12px;width:96%;max-width:800px;max-height:90vh;overflow-y:auto;animation:su .15s}
      .bar{height:4px;border-radius:2px;background:#181E2A;overflow:hidden}.bf{height:100%;border-radius:2px}
      .kc{background:#07080C;border:1px solid #181E2A;border-radius:7px;padding:9px;cursor:pointer;transition:border .1s}.kc:hover{border-color:#252D3A}
      .tb{padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#3E4A5A;border-bottom:2px solid transparent}.tb:hover{color:#B8C4D4}.tb.ac{color:#F59E0B;border-bottom-color:#F59E0B}
      .bx{background:#07080C;border-radius:5px;padding:7px 9px}
    `}</style>
    <div style={{display:"grid",gridTemplateColumns:"170px 1fr",minHeight:"100vh"}}>
      <aside style={{background:"#0A0C12",borderRight:"1px solid #181E2A",padding:"10px 0",position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
        <div style={{padding:"8px 12px 12px",borderBottom:"1px solid #181E2A",marginBottom:4,textAlign:"center"}}>
          <img src={LOGO} alt="NTF" style={{height:36,marginBottom:4,objectFit:"contain"}}/>
          <div style={{fontSize:7,color:"#3E4A5A"}}>Sistema Integral v3</div>
        </div>
        {NAV.map(n=><div key={n.k} className={`ni ${view===n.k?"ac":""}`} onClick={()=>setView(n.k)}><span style={{fontSize:12}}>{n.i}</span><span>{n.l}</span></div>)}
        <div style={{padding:"8px 12px",borderTop:"1px solid #181E2A",marginTop:6}}>
          <div className="mn" style={{fontSize:8,color:"#2A3344"}}>{TODAY}</div>
          <div style={{fontSize:7,color:"#3E4A5A",marginTop:2}}>NTF Fernández SCRL</div>
        </div>
      </aside>
      <main style={{padding:"12px 16px",overflow:"auto"}}>
        {view==="dashboard"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><img src={LOGO} alt="NTF" style={{height:28}}/><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>Panel Gerencial</h2></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:7,marginBottom:12}}>
            {[["Ingresos",fS(st.tI),"#34D399"],["Costos s/IGV",fS(st.tC),"#F87171"],["Margen",n2(st.mg)+"%","#F59E0B"],["En Ruta",st.eR,"#F59E0B"],["Pend.Fact",st.nPF,"#A78BFA"],["Pend.Cobro",fS(st.tPC),"#F87171"],["Finalizados",st.fn,"#34D399"],["Programados",st.pr,"#818CF8"]].map(([l,v,c],x)=>
              <div key={x} className="cd" style={{padding:"10px 12px",borderTop:`2px solid ${c}`}}><div style={{fontSize:8,color:"#3E4A5A",fontWeight:600,textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:19,fontWeight:700,color:c,marginTop:2}}>{v}</div></div>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div className="cd" style={{padding:10}}><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>💰 Rentabilidad</div>
              {viajes.filter(v=>v.est==="FINALIZADO").sort((a,b)=>liq[b.id].p-liq[a.id].p).map(v=>{const l=liq[v.id],rt=gR(v.ruta);return(
                <div key={v.id} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 0",borderBottom:"1px solid #181E2A11",cursor:"pointer"}} onClick={()=>{setSel(v);setTab("resumen")}}>
                  <span className="mn" style={{fontSize:9,fontWeight:600,color:"#F59E0B",minWidth:85}}>{v.cod}</span>
                  <span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{rt?.o}→{rt?.d}</span>
                  <span className="mn" style={{fontSize:9,fontWeight:600,color:l.p>=20?"#34D399":"#F87171"}}>{n2(l.p)}%</span>
                  <span className="mn" style={{fontSize:8,color:"#3E4A5A"}}>{fS(l.m)}</span>
                </div>)})}
            </div>
            <div className="cd" style={{padding:10}}><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>💳 Estado de Cuenta</div>
              {pnd.pC.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 0",borderBottom:"1px solid #181E2A11"}}><span className="mn" style={{fontSize:9,fontWeight:600,color:"#818CF8"}}>{p.vj}</span><span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{p.cli}</span><span className="mn" style={{fontSize:9,fontWeight:600,color:"#F87171"}}>{fS(p.tot)}</span></div>)}
              {pnd.pF.length>0&&<><div style={{fontSize:9,fontWeight:600,color:"#A78BFA",marginTop:6,marginBottom:3}}>📝 Pend. Facturar</div>
              {pnd.pF.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 0"}}><span className="mn" style={{fontSize:9,fontWeight:600,color:"#A78BFA"}}>{p.vj}</span><span style={{fontSize:9,color:"#3E4A5A",flex:1}}>{p.cli}</span><span className="mn" style={{fontSize:9,fontWeight:600,color:"#F59E0B"}}>{fS(p.tot)}</span></div>)}</>}
            </div>
          </div>
        </div>}
        {view==="viajes"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>🚛 Viajes</h2></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,alignItems:"start"}}>
            {KCOLS.map(col=>{const cv=viajes.filter(v=>v.est===col.k);return(<div key={col.k}>
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}><span>{col.i}</span><span style={{fontSize:10,fontWeight:700,color:col.c}}>{col.l}</span><span style={{fontSize:9,color:"#2A3344"}}>({cv.length})</span></div>
              {cv.map(v=>{const tr=gU(v.tr),rt=gR(v.ruta),l=liq[v.id];return(
                <div key={v.id} className="kc" style={{borderLeft:`3px solid ${col.c}`,marginBottom:6}} onClick={()=>{setSel(v);setTab("resumen")}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                    <span className="mn" style={{fontSize:9,fontWeight:600,color:col.c}}>{v.cod}</span>
                    <div style={{display:"flex",gap:0}} onClick={e=>e.stopPropagation()}>
                      <IB i="✏️" t="Editar" onClick={()=>{setSel(v);setTab("resumen")}}/>
                      <IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"viaje",id:v.id,l:v.cod})}/>
                    </div>
                  </div>
                  <B t={v.serv} bg={v.serv==="INTL"?"#312E81":"#181E2A"} c={v.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/>
                  {rt&&<div style={{fontSize:10,fontWeight:600,color:"#E0E7F0",marginTop:2}}>{rt.o} → {rt.d}</div>}
                  <div style={{fontSize:9,color:"#3E4A5A"}}>🚛 {tr?.pl} · 👤 {gC(v.con)?.nm}</div>
                  {v.gastos.length>0&&<div style={{marginTop:3,padding:"3px 5px",background:"#181E2A33",borderRadius:3,display:"flex",justifyContent:"space-between",fontSize:8}}>
                    <span>Costo: <span className="mn" style={{color:"#F87171"}}>{fS(l.tG)}</span></span>
                    <span>Mg: <span className="mn" style={{color:l.p>=20?"#34D399":"#F87171"}}>{n2(l.p)}%</span></span>
                  </div>}
                  {v.bolsa.totalPen>0&&<div style={{fontSize:8,color:"#F59E0B",marginTop:2}}>💰 Bolsa: {fS(v.bolsa.totalPen)}</div>}
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                    <span className="mn" style={{fontSize:8,color:"#2A3344"}}>{fD(v.fP)}</span>
                    <div style={{display:"flex",gap:2}} onClick={e=>e.stopPropagation()}>
                      {col.k==="PROGRAMADO"&&<button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"EN_RUTA")}>▶ Iniciar</button>}
                      {col.k==="EN_RUTA"&&<button className="bt" style={{fontSize:8,padding:"2px 6px"}} onClick={()=>mvV(v.id,"FINALIZADO")}>✓ Fin</button>}
                    </div>
                  </div>
                </div>
              )})}
            </div>)})}
          </div>
        </div>}
        {view==="combustible"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>⛽ Compras Combustible Ecuador</h2><div style={{fontSize:9,color:"#F59E0B"}}>Pagadas con bolsa de viaje → Costo se carga al viaje</div></div></div>
          <div className="cd" style={{overflow:"auto"}}>
            <table className="tbl"><thead><tr><th>Lote</th><th>Fecha</th><th>Proveedor</th><th>Doc</th><th>Gal</th><th>P.U.$</th><th>TC</th><th>Total S/</th><th>C.U.</th><th>Viaje</th><th></th></tr></thead><tbody>
              {compras.map(c=>{const vj=viajes.find(v=>v.id===c.vjId);return(<tr key={c.id}>
                <td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{c.lote}</td><td className="mn" style={{color:"#6B7A8D"}}>{fD(c.fecha)}</td>
                <td style={{fontSize:9}}>{c.prov}</td><td><B t={c.tdoc} bg={dC(c.tdoc)[0]} c={dC(c.tdoc)[1]}/></td>
                <td className="mn" style={{fontWeight:600}}>{fN(c.gal)}</td><td className="mn">${n2(c.puUsd)}</td><td className="mn">{c.tc}</td>
                <td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(c.tot)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{fS(c.cu)}</td>
                <td className="mn" style={{fontWeight:600,color:"#818CF8"}}>{vj?.cod||"—"}</td>
                <td style={{whiteSpace:"nowrap"}}><IB i="✏️" t="Editar"/><IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"compra",id:c.id,l:c.lote})}/></td>
              </tr>)})}
            </tbody></table></div>
        </div>}
        {view==="liquidacion"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:4}}>💰 Liquidación por Viaje</h2>
          <div style={{fontSize:9,color:"#6B7A8D",marginBottom:8}}>Costeo: Base Imponible sin IGV</div>
          <div className="cd" style={{overflow:"auto"}}>
            <table className="tbl"><thead><tr><th>Viaje</th><th>Ruta</th><th>Tipo</th><th>Comb</th><th>Costos</th><th>Ingresos</th><th>Margen</th><th>%</th><th>S//km</th><th>Factur.</th><th></th></tr></thead><tbody>
              {viajes.filter(v=>v.gastos.length>0).sort((a,b)=>liq[b.id].p-liq[a.id].p).map(v=>{const l=liq[v.id],rt=gR(v.ruta);return(<tr key={v.id} style={{cursor:"pointer"}} onClick={()=>{setSel(v);setTab("resumen")}}>
                <td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{v.cod}</td><td style={{fontSize:9}}>{rt?.o}→{rt?.d}</td>
                <td><B t={v.serv} bg={v.serv==="INTL"?"#312E81":"#181E2A"} c={v.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/></td>
                <td className="mn" style={{color:"#F59E0B"}}>{fS(l.cP)}</td><td className="mn" style={{fontWeight:600,color:"#F87171"}}>{fS(l.tG)}</td>
                <td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(l.tI)}</td>
                <td className="mn" style={{fontWeight:700,color:l.p>=20?"#34D399":"#F87171"}}>{fS(l.m)}</td>
                <td className="mn" style={{fontWeight:700,fontSize:11,color:l.p>=20?"#34D399":"#F87171"}}>{n2(l.p)}%</td>
                <td className="mn" style={{color:"#6B7A8D"}}>{fS(l.ck)}</td>
                <td>{l.pF.length>0?<B t="PEND.FACT" bg="#3B076444" c="#C4B5FD"/>:l.pC.length>0?<B t="PEND.COBRO" bg="#7F1D1D44" c="#FCA5A5"/>:<B t="COBRADO" bg="#064E3B" c="#6EE7B7"/>}</td>
                <td onClick={e=>e.stopPropagation()}><IB i="✏️" t="Ver detalle" onClick={()=>{setSel(v);setTab("resumen")}}/></td>
              </tr>)})}
            </tbody></table></div>
        </div>}
        {view==="documentos"&&<div style={{animation:"su .2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>📎 Gestión Documentaria</h2><button className="bt ba">+ Subir Documento</button></div>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Tipo</th><th>Número</th><th>Fecha</th><th>Entidad</th><th>Ref.</th><th>Descripción</th><th>Archivo</th><th></th></tr></thead><tbody>
            {docs.map(d=><tr key={d.id}><td><B t={d.tipo} bg={dC(d.tipo)[0]} c={dC(d.tipo)[1]}/></td><td className="mn" style={{fontWeight:600}}>{d.nro}</td><td className="mn" style={{color:"#6B7A8D"}}>{fD(d.fecha)}</td><td style={{fontSize:9}}>{d.ent}</td><td className="mn" style={{fontSize:9,color:"#F59E0B"}}>{d.ref}</td><td style={{fontSize:9}}>{d.desc}</td>
              <td>{d.arch?<span style={{color:"#34D399",fontSize:9}}>📄 {d.arch}</span>:<span style={{color:"#F87171",fontSize:9}}>⚠ Sin archivo</span>}</td>
              <td style={{whiteSpace:"nowrap"}}><IB i="✏️" t="Editar"/><IB i="🗑️" c="#F87171" t="Eliminar" onClick={()=>setCfm({t:"doc",id:d.id,l:d.nro})}/></td></tr>)}
          </tbody></table></div>
        </div>}
        {view==="regcompras"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>📕 Registro de Compras</h2>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Fecha</th><th>Viaje</th><th>Tipo</th><th>Nro</th><th>Proveedor</th><th>Cat.</th><th>Base Imp.</th><th>IGV</th><th>Total</th></tr></thead><tbody>
            {regC.map((r,i)=><tr key={i}><td className="mn" style={{color:"#6B7A8D"}}>{fD(r.f)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{r.vj}</td><td><B t={r.tdoc} bg={dC(r.tdoc)[0]} c={dC(r.tdoc)[1]}/></td><td className="mn" style={{fontSize:8}}>{r.ndoc}</td><td style={{fontSize:9}}>{r.prov}</td><td style={{fontSize:9}}>{r.cat}</td><td className="mn">{fS(r.base)}</td><td className="mn" style={{color:r.igv>0?"#F59E0B":"#2A3344"}}>{fS(r.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(r.tot)}</td></tr>)}
          </tbody></table></div>
          <div style={{marginTop:6,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Base Imp.",regC.reduce((s,r)=>s+r.base,0),"#F59E0B"],["IGV Créd.Fiscal",regC.reduce((s,r)=>s+r.igv,0),"#818CF8"],["Total",regC.reduce((s,r)=>s+r.tot,0),"#34D399"]].map(([l,v,c])=><div key={l} className="cd" style={{padding:8,textAlign:"center"}}><div style={{fontSize:8,color:"#3E4A5A",textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:15,fontWeight:700,color:c}}>{fS(v)}</div></div>)}
          </div>
        </div>}
        {view==="regventas"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>📗 Registro de Ventas</h2>
          <div className="cd" style={{overflow:"auto"}}><table className="tbl"><thead><tr><th>Fecha</th><th>Viaje</th><th>Tipo</th><th>Serie-Nro</th><th>Cliente</th><th>RUC</th><th>Base Imp.</th><th>IGV</th><th>Total</th><th>Estado</th></tr></thead><tbody>
            {regV.map((r,i)=><tr key={i}><td className="mn" style={{color:"#6B7A8D"}}>{fD(r.f)}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{r.vj}</td><td><B t={r.tdoc} bg={dC(r.tdoc)[0]} c={dC(r.tdoc)[1]}/></td><td className="mn" style={{fontWeight:600}}>{r.sn}</td><td style={{fontSize:9}}>{r.cli}</td><td className="mn" style={{fontSize:8}}>{r.ruc}</td><td className="mn">{fS(r.base)}</td><td className="mn" style={{color:r.igv>0?"#F59E0B":"#2A3344"}}>{fS(r.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(r.tot)}</td>
              <td><B t={r.est==="COBRADO"?"COBRADO":r.est==="PENDIENTE"?"PEND.COBRO":"PEND.FACT"} bg={r.est==="COBRADO"?"#064E3B":r.est==="PENDIENTE"?"#7F1D1D44":"#3B076444"} c={r.est==="COBRADO"?"#6EE7B7":r.est==="PENDIENTE"?"#FCA5A5":"#C4B5FD"}/></td></tr>)}
          </tbody></table></div>
        </div>}
        {view==="cuentas"&&<div style={{animation:"su .2s"}}>
          <h2 style={{fontSize:14,fontWeight:700,color:"#F1F5F9",marginBottom:10}}>💳 Estado de Cuenta</h2>
          {pnd.pF.length>0&&<><div style={{fontSize:11,fontWeight:600,color:"#A78BFA",marginBottom:6}}>📝 Pendientes de Facturar</div>
          <div className="cd" style={{overflow:"auto",marginBottom:12}}><table className="tbl"><thead><tr><th>Viaje</th><th>Cliente</th><th>Monto</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
            {pnd.pF.map((p,i)=><tr key={i}><td className="mn" style={{fontWeight:600,color:"#A78BFA"}}>{p.vj}</td><td>{p.cli}</td><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{fS(p.tot)}</td><td><B t="PEND.FACT" bg="#3B076444" c="#C4B5FD"/></td><td><button className="bt ba" style={{fontSize:8}}>Emitir Factura</button></td></tr>)}
          </tbody></table></div></>}
          {pnd.pC.length>0&&<><div style={{fontSize:11,fontWeight:600,color:"#F87171",marginBottom:6}}>💳 Pendientes de Cobro</div>
          <div className="cd" style={{overflow:"auto",marginBottom:12}}><table className="tbl"><thead><tr><th>Viaje</th><th>Doc.</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Acción</th></tr></thead><tbody>
            {pnd.pC.map((p,i)=><tr key={i}><td className="mn" style={{fontWeight:600,color:"#F59E0B"}}>{p.vj}</td><td className="mn">{p.sn}</td><td>{p.cli}</td><td className="mn">{fD(p.f)}</td><td className="mn" style={{fontWeight:600,color:"#F87171"}}>{fS(p.tot)}</td><td><button className="bt" style={{fontSize:8}}>Registrar Cobro</button></td></tr>)}
          </tbody></table></div></>}
          <div className="cd" style={{padding:10}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["Pend.Facturar",st.tPF,"#A78BFA"],["Pend.Cobro",st.tPC,"#F87171"],["Total Recaudar",st.tPC+st.tPF,"#F59E0B"]].map(([l,v,c])=><div key={l} className="bx" style={{textAlign:"center"}}><div style={{fontSize:8,color:"#3E4A5A",textTransform:"uppercase"}}>{l}</div><div className="mn" style={{fontSize:15,fontWeight:700,color:c}}>{fS(v)}</div></div>)}
          </div></div>
        </div>}
      </main>
    </div>
    {sel&&<div className="ov" onClick={()=>setSel(null)}><div className="mo" onClick={e=>e.stopPropagation()}>
      {(()=>{const v=sel,l=liq[v.id],tr=gU(v.tr),rt=gR(v.ruta),cl=gCl(v.cli),cd=gC(v.con),co=KCOLS.find(x=>x.k===v.est);return(<>
        <div style={{padding:"10px 16px",borderBottom:"1px solid #181E2A",display:"flex",justifyContent:"space-between",alignItems:"center",background:"#0A0C12"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src={LOGO} alt="NTF" style={{height:20}}/>
            <span className="mn" style={{fontSize:15,fontWeight:700,color:co?.c}}>{v.cod}</span>
            <B t={`${co?.i} ${co?.l}`} bg={`${co?.c}22`} c={co?.c}/><B t={v.serv} bg={v.serv==="INTL"?"#312E81":"#181E2A"} c={v.serv==="INTL"?"#A5B4FC":"#6B7A8D"}/>
          </div>
          <div style={{display:"flex",gap:4}}><IB i="🗑️" c="#F87171" t="Eliminar viaje" onClick={()=>setCfm({t:"viaje",id:v.id,l:v.cod})}/><button className="bt" onClick={()=>setSel(null)}>✕</button></div>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid #181E2A",padding:"0 16px",background:"#0A0C12"}}>
          {[["resumen","📊 Resumen"],["gastos","📕 Gastos"],["ingresos","📗 Ingresos"],["bolsa","💰 Bolsa"]].map(([k,la])=><div key={k} className={`tb ${tab===k?"ac":""}`} onClick={()=>setTab(k)}>{la}</div>)}
        </div>
        <div style={{padding:"10px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5,marginBottom:10}}>
            {[["Ruta",rt?`${rt.o}→${rt.d}`:"—"],["Tracto",tr?.pl],["Conductor",cd?.nm],["Cliente",cl?.rs],["Peso",`${v.peso}t · ${rt?.km}km`]].map(([a,b])=><div key={a} className="bx"><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>{a}</div><div style={{fontSize:10,fontWeight:600,color:"#E0E7F0"}}>{b}</div></div>)}
          </div>
          {tab==="resumen"&&<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
              <div style={{background:"#064E3B22",border:"1px solid #064E3B44",borderRadius:8,padding:10}}><div style={{fontSize:8,color:"#6EE7B7",textTransform:"uppercase",fontWeight:600}}>Ingresos Neto</div><div className="mn" style={{fontSize:22,fontWeight:700,color:"#34D399"}}>{fS(l.tI)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>Bruto: {fS(l.tIB)}</div></div>
              <div style={{background:"#7F1D1D22",border:"1px solid #7F1D1D44",borderRadius:8,padding:10}}><div style={{fontSize:8,color:"#FCA5A5",textTransform:"uppercase",fontWeight:600}}>Costos Base Imp.</div><div className="mn" style={{fontSize:22,fontWeight:700,color:"#F87171"}}>{fS(l.tG)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>c/IGV: {fS(l.tGI)}</div></div>
            </div>
            {[["⛽ Combustible",l.cP,"#F59E0B"],["📕 Total Costos",l.tG,"#F87171"]].map(([a,val,c2])=><div key={a} style={{marginBottom:3}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:1}}><span style={{color:"#6B7A8D"}}>{a}</span><span className="mn" style={{color:c2,fontWeight:600}}>{fS(val)}</span></div><div className="bar"><div className="bf" style={{width:`${l.tG>0?(val/l.tG)*100:0}%`,background:c2}}/></div></div>)}
            <div style={{background:l.p>=20?"#064E3B22":"#7F1D1D22",border:`1px solid ${l.p>=20?"#064E3B":"#7F1D1D"}44`,borderRadius:8,padding:10,marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
              {[["MARGEN",fS(l.m),l.p>=20?"#34D399":"#F87171"],["MARGEN %",n2(l.p)+"%",l.p>=20?"#34D399":"#F87171"],["S//KM",fS(l.ck),"#F59E0B"],["S//TON",fS(l.ct),"#818CF8"]].map(([a,b,c2])=><div key={a} style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase",fontWeight:600}}>{a}</div><div className="mn" style={{fontSize:14,fontWeight:700,color:c2}}>{b}</div></div>)}
            </div>
          </>}
          {tab==="gastos"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Gastos documentados — Base Imp. para costeo</div>
            <table className="tbl"><thead><tr><th>Categoría</th><th>Doc</th><th>Nro</th><th>Proveedor</th><th>Base</th><th>IGV</th><th>Total</th><th></th></tr></thead><tbody>
            {v.gastos.map((g,i)=><tr key={i}><td style={{fontWeight:600,fontSize:9}}>{g.cat}</td><td><B t={g.tdoc} bg={dC(g.tdoc)[0]} c={dC(g.tdoc)[1]}/></td><td className="mn" style={{fontSize:8}}>{g.ndoc}</td><td style={{fontSize:9}}>{g.prov}</td><td className="mn" style={{fontWeight:600}}>{fS(g.base)}</td><td className="mn" style={{color:g.igv>0?"#F59E0B":"#2A3344"}}>{fS(g.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(g.tot)}</td><td><IB i="✏️" t="Editar"/><IB i="🗑️" c="#F87171" t="Eliminar"/></td></tr>)}
            </tbody></table><div style={{marginTop:6,padding:6,background:"#181E2A44",borderRadius:4,fontSize:9,color:"#6B7A8D"}}>Costeo usa Base Imponible (sin IGV). Fact. extranjeras: IGV=0.</div></>}
          {tab==="ingresos"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Ingresos facturados / por facturar</div>
            <table className="tbl"><thead><tr><th>Doc</th><th>Serie-Nro</th><th>Fecha</th><th>Cliente</th><th>Base</th><th>IGV</th><th>Total</th><th>Estado</th><th></th></tr></thead><tbody>
            {v.ingresos.map((i,x)=>{const c2=gCl(i.cli);return(<tr key={x}><td><B t={i.tdoc} bg={dC(i.tdoc)[0]} c={dC(i.tdoc)[1]}/></td><td className="mn" style={{fontWeight:600}}>{i.serie}-{i.nro}</td><td className="mn">{fD(i.fecha)}</td><td style={{fontSize:9}}>{c2?.rs}</td><td className="mn">{fS(i.base)}</td><td className="mn" style={{color:i.igv>0?"#F59E0B":"#2A3344"}}>{fS(i.igv)}</td><td className="mn" style={{fontWeight:600,color:"#34D399"}}>{fS(i.tot)}</td>
              <td><B t={i.estado==="COBRADO"?"COBRADO":i.estado==="PENDIENTE"?"PEND.COBRO":"PEND.FACT"} bg={i.estado==="COBRADO"?"#064E3B":i.estado==="PENDIENTE"?"#7F1D1D44":"#3B076444"} c={i.estado==="COBRADO"?"#6EE7B7":i.estado==="PENDIENTE"?"#FCA5A5":"#C4B5FD"}/></td><td><IB i="✏️" t="Editar"/></td></tr>)})}
            </tbody></table></>}
          {tab==="bolsa"&&<><div style={{fontSize:10,fontWeight:600,color:"#6B7A8D",marginBottom:6}}>Bolsa de Viaje</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Soles</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#34D399"}}>{fS(v.bolsa.pen)}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Dólares</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#93C5FD"}}>${fN(v.bolsa.usd)}</div><div style={{fontSize:8,color:"#3E4A5A"}}>TC: {v.bolsa.tcUsd}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Total PEN</div><div className="mn" style={{fontSize:15,fontWeight:700,color:"#F59E0B"}}>{fS(v.bolsa.totalPen)}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Bolsa</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#F59E0B"}}>{fS(v.bolsa.totalPen)}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Gastado</div><div className="mn" style={{fontSize:14,fontWeight:700,color:"#F87171"}}>{fS(l.tGI)}</div></div>
              <div className="bx" style={{textAlign:"center"}}><div style={{fontSize:7,color:"#3E4A5A",textTransform:"uppercase"}}>Saldo</div><div className="mn" style={{fontSize:14,fontWeight:700,color:v.bolsa.totalPen-l.tGI>=0?"#34D399":"#F87171"}}>{fS(v.bolsa.totalPen-l.tGI)}</div></div>
            </div>
            <div style={{marginTop:6,padding:6,background:"#78350F22",borderRadius:4,fontSize:9,color:"#FDE68A"}}>Bolsa incluye dinero para combustible Ecuador. Factura extranjera alimenta costeo real.</div></>}
        </div>
      </>)})()}
    </div></div>}
    {cfm&&<div className="ov" onClick={()=>setCfm(null)}><div className="mo" style={{maxWidth:400,padding:20}} onClick={e=>e.stopPropagation()}>
      <div style={{fontSize:13,fontWeight:700,color:"#F1F5F9",marginBottom:8}}>⚠️ Confirmar eliminación</div>
      <div style={{fontSize:11,color:"#B8C4D4",marginBottom:16}}>¿Eliminar <strong style={{color:"#F59E0B"}}>{cfm.l}</strong>? Esta acción no se puede deshacer.</div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <button className="bt" onClick={()=>setCfm(null)}>Cancelar</button>
        <button className="bt" style={{background:"#7F1D1D",borderColor:"#7F1D1D",color:"#FCA5A5"}} onClick={()=>{if(cfm.t==="viaje")delV(cfm.id);if(cfm.t==="compra")delCo(cfm.id);if(cfm.t==="doc")delDo(cfm.id)}}>🗑️ Eliminar</button>
      </div>
    </div></div>}
  </div>);
}
